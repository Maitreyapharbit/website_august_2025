import { prisma } from '../config/prisma';

export class CompanyService {
	static list() {
		return prisma.company.findMany({ where: { isVerified: true } });
	}
	static create(data: { name: string; address?: string; phone?: string; email?: string; website?: string }) {
		return prisma.company.create({ data });
	}
	static get(id: string) {
		return prisma.company.findUnique({ where: { id } });
	}
	static update(id: string, data: any) {
		return prisma.company.update({ where: { id }, data });
	}
	static remove(id: string) {
		return prisma.company.delete({ where: { id } });
	}
}