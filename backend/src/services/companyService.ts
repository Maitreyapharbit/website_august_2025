import { supabase, supabaseAdmin } from '../config/database';
import { ApiError } from '../middleware/errorHandler';
import { Company } from '../types';
import { logger } from '../config/logger';

export class CompanyService {
  static async getCompanyInfo(): Promise<Company> {
    try {
      const { data: company, error } = await supabase
        .from('company')
        .select('*')
        .single();

      if (error || !company) {
        // Return default company info if not found
        return {
          id: '1',
          name: 'Pharbit',
          description: 'Global pharmaceutical technology company combining blockchain and IoT sensors to create unbreakable chains of custody for medicines worldwide.',
          email: 'info@pharbit.com',
          phone: '+4917697711873',
          address: 'An Europakanal 6, 91056 Erlangen, Germany'
        };
      }

      return company;
    } catch (error) {
      logger.error('Get company info error:', error);
      throw new ApiError(500, 'Failed to fetch company information');
    }
  }

  static async updateCompanyInfo(updates: Partial<Omit<Company, 'id'>>): Promise<Company> {
    try {
      // First, try to get existing company
      const { data: existing } = await supabaseAdmin
        .from('company')
        .select('*')
        .single();

      let company;
      
      if (existing) {
        // Update existing company
        const { data: updatedCompany, error } = await supabaseAdmin
          .from('company')
          .update(updates)
          .eq('id', existing.id)
          .select()
          .single();

        if (error) {
          throw new ApiError(500, 'Failed to update company information');
        }
        company = updatedCompany;
      } else {
        // Create new company record
        const { data: newCompany, error } = await supabaseAdmin
          .from('company')
          .insert({
            name: updates.name || 'Pharbit',
            description: updates.description || 'Global pharmaceutical technology company',
            email: updates.email || 'info@pharbit.com',
            phone: updates.phone || '+4917697711873',
            address: updates.address || 'An Europakanal 6, 91056 Erlangen, Germany'
          })
          .select()
          .single();

        if (error) {
          throw new ApiError(500, 'Failed to create company information');
        }
        company = newCompany;
      }

      logger.info('Company information updated successfully', { companyId: company.id });
      return company;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Update company error:', error);
      throw new ApiError(500, 'Failed to update company information');
    }
  }
}