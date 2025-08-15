import { supabase } from '../config/database';
import { ApiError } from '../middleware/error';
import { StatusCodes } from 'http-status-codes';

export class CompanyService {
	static async list() {
		const { data, error } = await supabase
			.from('companies')
			.select('*')
			.eq('is_verified', true);
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch companies');
		return data;
	}
	
	static async create(data: { name: string; address?: string; phone?: string; email?: string; website?: string }) {
		const { data: company, error } = await supabase
			.from('companies')
			.insert(data)
			.select()
			.single();
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create company');
		return company;
	}
	
	static async get(id: string) {
		const { data, error } = await supabase
			.from('companies')
			.select('*')
			.eq('id', id)
			.single();
		
		if (error) throw new ApiError(StatusCodes.NOT_FOUND, 'Company not found');
		return data;
	}
	
	static async update(id: string, data: any) {
		const { data: company, error } = await supabase
			.from('companies')
			.update(data)
			.eq('id', id)
			.select()
			.single();
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update company');
		return company;
	}
	
	static async remove(id: string) {
		const { error } = await supabase
			.from('companies')
			.delete()
			.eq('id', id);
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to delete company');
	}
}