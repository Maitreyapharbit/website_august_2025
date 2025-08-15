import { supabase } from '../config/database';
import { emitCompanyEvent, emitShipmentEvent } from '../realtime/socket';
import { sendMail } from '../utils/mailer';
import { ApiError } from '../middleware/error';
import { StatusCodes } from 'http-status-codes';

export class SensorService {
	static async register(companyId: string, serial: string, productId?: string | null) {
		const { data, error } = await supabase
			.from('sensors')
			.insert({
				company_id: companyId,
				serial,
				product_id: productId || null
			})
			.select()
			.single();
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to register sensor');
		return data;
	}
	
	static async addReading(sensorId: string, data: { temperature: number; humidity?: number | null; latitude?: number | null; longitude?: number | null }) {
		const { data: reading, error } = await supabase
			.from('sensor_readings')
			.insert({
				sensor_id: sensorId,
				temperature: data.temperature,
				humidity: data.humidity || null,
				latitude: data.latitude || null,
				longitude: data.longitude || null
			})
			.select()
			.single();
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to add sensor reading');
		return reading;
	}
	
	static async listReadings(sensorId: string, take = 100) {
		const { data, error } = await supabase
			.from('sensor_readings')
			.select('*')
			.eq('sensor_id', sensorId)
			.order('created_at', { ascending: false })
			.limit(take);
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch sensor readings');
		return data;
	}
	
	static async addAlert(companyId: string, payload: { type: string; message: string; shipmentId?: string; sensorId?: string }) {
		const { data: alert, error } = await supabase
			.from('alerts')
			.insert({
				company_id: companyId,
				type: payload.type as any,
				message: payload.message,
				shipment_id: payload.shipmentId || null,
				sensor_id: payload.sensorId || null
			})
			.select()
			.single();
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create alert');
		
		emitCompanyEvent(companyId, 'alert:new', alert);
		if (payload.shipmentId) emitShipmentEvent(payload.shipmentId, 'alert:new', alert);
		
		// email notification (best-effort)
		const { data: company } = await supabase
			.from('companies')
			.select('email')
			.eq('id', companyId)
			.single();
		
		if (company?.email) {
			void sendMail(company.email, `Pharbit Alert: ${payload.type}`, `<p>${payload.message}</p>`).catch(() => {});
		}
		
		return alert;
	}
	
	static async listAlerts(companyId: string) {
		const { data, error } = await supabase
			.from('alerts')
			.select('*')
			.eq('company_id', companyId)
			.order('created_at', { ascending: false });
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch alerts');
		return data;
	}
}