"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const database_1 = require("../config/database");
const errorHandler_1 = require("../middleware/errorHandler");
const logger_1 = require("../config/logger");
class CompanyService {
    static async getCompanyInfo() {
        try {
            const { data: company, error } = await database_1.supabase
                .from('company')
                .select('*')
                .single();
            if (error || !company) {
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
        }
        catch (error) {
            logger_1.logger.error('Get company info error:', error);
            throw new errorHandler_1.ApiError(500, 'Failed to fetch company information');
        }
    }
    static async updateCompanyInfo(updates) {
        try {
            const { data: existing } = await database_1.supabaseAdmin
                .from('company')
                .select('*')
                .single();
            let company;
            if (existing) {
                const { data: updatedCompany, error } = await database_1.supabaseAdmin
                    .from('company')
                    .update(updates)
                    .eq('id', existing.id)
                    .select()
                    .single();
                if (error) {
                    throw new errorHandler_1.ApiError(500, 'Failed to update company information');
                }
                company = updatedCompany;
            }
            else {
                const { data: newCompany, error } = await database_1.supabaseAdmin
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
                    throw new errorHandler_1.ApiError(500, 'Failed to create company information');
                }
                company = newCompany;
            }
            logger_1.logger.info('Company information updated successfully', { companyId: company.id });
            return company;
        }
        catch (error) {
            if (error instanceof errorHandler_1.ApiError) {
                throw error;
            }
            logger_1.logger.error('Update company error:', error);
            throw new errorHandler_1.ApiError(500, 'Failed to update company information');
        }
    }
}
exports.CompanyService = CompanyService;
//# sourceMappingURL=companyService.js.map