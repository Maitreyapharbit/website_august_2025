import { supabase } from '../config/database';
import { emitCompanyEvent, emitShipmentEvent } from '../realtime/socket';
import { ApiError } from '../middleware/error';
import { StatusCodes } from 'http-status-codes';
import { Json } from '../types/database.types';

export class ShipmentService {
	static async create(data: { reference: string; batchId: string; origin: string; destination: string; companyId: string }) {
		const { data: shipment, error } = await supabase
			.from('shipments')
			.insert({
				reference: data.reference,
				batch_id: data.batchId,
				origin: data.origin,
				destination: data.destination,
				company_id: data.companyId,
				status: 'CREATED',
				checkpoints: []
			})
			.select()
			.single();
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create shipment');
		return shipment;
	}
	
	static async list(filters: { companyId?: string; status?: string }) {
		let query = supabase.from('shipments').select('*');
		
		if (filters.companyId) {
			query = query.eq('company_id', filters.companyId);
		}
		
		if (filters.status) {
			query = query.eq('status', filters.status);
		}
		
		const { data, error } = await query;
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch shipments');
		return data;
	}
	
	static async get(id: string) {
		const { data, error } = await supabase
			.from('shipments')
			.select('*')
			.eq('id', id)
			.single();
		
		if (error) throw new ApiError(StatusCodes.NOT_FOUND, 'Shipment not found');
		return data;
	}
	
	static async addCheckpoint(id: string, checkpoint: { location: string; status: string; metadata?: any }) {
		const { data: shipment, error: fetchError } = await supabase
			.from('shipments')
			.select('*')
			.eq('id', id)
			.single();
		
		if (fetchError || !shipment) throw new ApiError(StatusCodes.NOT_FOUND, 'Shipment not found');
		
		const existing = (shipment.checkpoints as Json[]) || [];
		const next = [...existing, { ...checkpoint, at: new Date().toISOString() }];
		
		const { data: updated, error: updateError } = await supabase
			.from('shipments')
			.update({
				checkpoints: next,
				status: checkpoint.status as any
			})
			.eq('id', id)
			.select()
			.single();
		
		if (updateError) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to add checkpoint');
		
		emitShipmentEvent(id, 'shipment:checkpoint', updated);
		emitCompanyEvent(shipment.company_id, 'shipment:checkpoint', updated);
		return updated;
	}
	
	static async history(id: string) {
		const { data, error } = await supabase
			.from('shipments')
			.select('checkpoints')
			.eq('id', id)
			.single();
		
		if (error) throw new ApiError(StatusCodes.NOT_FOUND, 'Shipment not found');
		return data;
	}
}