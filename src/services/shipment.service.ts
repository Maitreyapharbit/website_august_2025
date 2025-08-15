import { prisma } from '../config/prisma';
import { emitCompanyEvent, emitShipmentEvent } from '../realtime/socket';
import { Prisma } from '@prisma/client';

export class ShipmentService {
	static create(data: { reference: string; batchId: string; origin: string; destination: string; companyId: string }) {
		return prisma.shipment.create({ data: { ...data, status: 'CREATED', checkpoints: [] } });
	}
	static list(filters: { companyId?: string; status?: string }) {
		return prisma.shipment.findMany({ where: { companyId: filters.companyId, status: filters.status as any } });
	}
	static get(id: string) {
		return prisma.shipment.findUnique({ where: { id } });
	}
	static async addCheckpoint(id: string, checkpoint: { location: string; status: string; metadata?: any }) {
		const shipment = await prisma.shipment.findUnique({ where: { id } });
		if (!shipment) return null;
		const existing = (shipment.checkpoints as unknown as Prisma.JsonValue[]) || [];
		const next = [...existing, { ...checkpoint, at: new Date().toISOString() }];
		const updated = await prisma.shipment.update({ where: { id }, data: { checkpoints: next as unknown as Prisma.InputJsonValue[], status: checkpoint.status as any } });
		emitShipmentEvent(id, 'shipment:checkpoint', updated);
		emitCompanyEvent(shipment.companyId, 'shipment:checkpoint', updated);
		return updated;
	}
	static history(id: string) {
		return prisma.shipment.findUnique({ where: { id }, select: { checkpoints: true } });
	}
}