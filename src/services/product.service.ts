import { supabase } from '../config/database';
import { ApiError } from '../middleware/error';
import { StatusCodes } from 'http-status-codes';

export class ProductService {
	static async create(data: { name: string; gtin: string; description?: string; manufacturerId: string }) {
		const { data: product, error } = await supabase
			.from('products')
			.insert({
				name: data.name,
				gtin: data.gtin,
				description: data.description || null,
				manufacturer_id: data.manufacturerId
			})
			.select()
			.single();
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create product');
		return product;
	}
	
	static async list(filters: { manufacturerId?: string }) {
		let query = supabase.from('products').select('*');
		
		if (filters.manufacturerId) {
			query = query.eq('manufacturer_id', filters.manufacturerId);
		}
		
		const { data, error } = await query;
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch products');
		return data;
	}
	
	static async get(id: string) {
		const { data, error } = await supabase
			.from('products')
			.select(`
				*,
				batches(*),
				manufacturer:companies(*)
			`)
			.eq('id', id)
			.single();
		
		if (error) throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
		return data;
	}
}

export class BatchService {
	static async create(productId: string, data: { batchNumber: string; expiryDate: Date }) {
		const { data: batch, error } = await supabase
			.from('batches')
			.insert({
				batch_number: data.batchNumber,
				expiry_date: data.expiryDate.toISOString(),
				product_id: productId
			})
			.select()
			.single();
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create batch');
		return batch;
	}
	
	static async get(id: string) {
		const { data, error } = await supabase
			.from('batches')
			.select(`
				*,
				product:products(*),
				shipments(*)
			`)
			.eq('id', id)
			.single();
		
		if (error) throw new ApiError(StatusCodes.NOT_FOUND, 'Batch not found');
		return data;
	}
	
	static async updateLocation(batchId: string, location: string) {
		const { data, error } = await supabase
			.from('batches')
			.update({
				current_location: location,
				status: 'IN_TRANSIT'
			})
			.eq('id', batchId)
			.select()
			.single();
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update batch location');
		return data;
	}
	
	static async updateStatus(batchId: string, status: string) {
		const { data, error } = await supabase
			.from('batches')
			.update({ status: status as any })
			.eq('id', batchId)
			.select()
			.single();
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update batch status');
		return data;
	}
}