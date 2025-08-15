import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma || new PrismaClient({
	log: [
		{
			emit: 'event',
			level: 'query',
		},
		{
			emit: 'event',
			level: 'error',
		},
		{
			emit: 'event',
			level: 'info',
		},
		{
			emit: 'event',
			level: 'warn',
		},
	],
});

// Enhanced logging for Prisma events
prisma.$on('error', (e) => {
	logger.error('Prisma error', { error: e });
});

prisma.$on('warn', (e) => {
	logger.warn('Prisma warning', { warning: e });
});

prisma.$on('info', (e) => {
	logger.info('Prisma info', { info: e });
});

if (process.env.NODE_ENV === 'development') {
	prisma.$on('query', (e) => {
		logger.debug('Prisma query', {
			query: e.query,
			params: e.params,
			duration: `${e.duration}ms`,
		});
	});
}

// Test database connection
export async function testDatabaseConnection() {
	try {
		await prisma.$connect();
		logger.info('Database connection successful');
		return true;
	} catch (error) {
		logger.error('Database connection failed', { error });
		return false;
	}
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;