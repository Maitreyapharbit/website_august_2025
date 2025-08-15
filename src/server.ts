import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app';
import { logger } from './config/logger';
import { env } from './config/env';
import { initializeSocket } from './realtime/socket';
import { initializeRedis, closeRedis } from './config/redis';

const port = env.PORT;
const server = http.createServer(app);

const io = new SocketIOServer(server, {
	cors: {
		origin: env.CORS_ORIGINS,
		credentials: true,
	},
});

initializeSocket(io);

// Initialize Redis before starting the server
async function startServer() {
	try {
		// Initialize Redis connection
		await initializeRedis();
		
		// Start the HTTP server
		server.listen(port, () => {
			logger.info(`Pharbit API listening on port ${port}`);
		});
	} catch (error) {
		logger.error('Failed to start server', { error });
		process.exit(1);
	}
}

// Graceful shutdown handling
process.on('SIGTERM', async () => {
	logger.info('SIGTERM received, shutting down gracefully');
	server.close(async () => {
		await closeRedis();
		process.exit(0);
	});
});

process.on('SIGINT', async () => {
	logger.info('SIGINT received, shutting down gracefully');
	server.close(async () => {
		await closeRedis();
		process.exit(0);
	});
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
	logger.error('Uncaught exception', { error });
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	logger.error('Unhandled rejection', { reason, promise });
	process.exit(1);
});

// Start the server
startServer();

export default server;