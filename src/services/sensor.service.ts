import { prisma } from '../config/prisma';
import { emitCompanyEvent, emitShipmentEvent } from '../realtime/socket';
import { sendMail } from '../utils/mailer';

export class SensorService {
	static register(companyId: string, serial: string, productId?: string | null) {
		return prisma.sensor.create({ data: { companyId, serial, productId: productId || undefined } });
	}
	static addReading(sensorId: string, data: { temperature: number; humidity?: number | null; latitude?: number | null; longitude?: number | null }) {
		return prisma.sensorReading.create({ data: { sensorId, ...data } });
	}
	static listReadings(sensorId: string, take = 100) {
		return prisma.sensorReading.findMany({ where: { sensorId }, orderBy: { createdAt: 'desc' }, take });
	}
	static async addAlert(companyId: string, payload: { type: string; message: string; shipmentId?: string; sensorId?: string }) {
		const alert = await prisma.alert.create({ data: { companyId, type: payload.type as any, message: payload.message, shipmentId: payload.shipmentId, sensorId: payload.sensorId } });
		emitCompanyEvent(companyId, 'alert:new', alert);
		if (payload.shipmentId) emitShipmentEvent(payload.shipmentId, 'alert:new', alert);
		// email notification (best-effort)
		const company = await prisma.company.findUnique({ where: { id: companyId } });
		if (company?.email) {
			void sendMail(company.email, `Pharbit Alert: ${payload.type}`, `<p>${payload.message}</p>`).catch(() => {});
		}
		return alert;
	}
	static listAlerts(companyId: string) {
		return prisma.alert.findMany({ where: { companyId }, orderBy: { createdAt: 'desc' } });
	}
}