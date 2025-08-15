import { prisma } from '../config/prisma';

export class ProductService {
	static create(data: { name: string; gtin: string; description?: string; manufacturerId: string }) {
		return prisma.product.create({ data });
	}
	static list(filters: { manufacturerId?: string }) {
		return prisma.product.findMany({ where: { manufacturerId: filters.manufacturerId } });
	}
	static get(id: string) {
		return prisma.product.findUnique({ where: { id }, include: { batches: true, manufacturer: true } });
	}
}

export class BatchService {
	static create(productId: string, data: { batchNumber: string; expiryDate: Date }) {
		return prisma.batch.create({ data: { ...data, productId } });
	}
	static get(id: string) {
		return prisma.batch.findUnique({ where: { id }, include: { product: true, shipments: true } });
	}
	static updateLocation(batchId: string, location: string) {
		return prisma.batch.update({ where: { id: batchId }, data: { currentLocation: location, status: 'IN_TRANSIT' } });
	}
	static updateStatus(batchId: string, status: string) {
		return prisma.batch.update({ where: { id: batchId }, data: { status: status as any } });
	}
}