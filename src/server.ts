import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app';
import { logger } from './config/logger';
import { env } from './config/env';
import { initializeSocket } from './realtime/socket';

const port = env.PORT;
const server = http.createServer(app);

const io = new SocketIOServer(server, {
	cors: {
		origin: env.CORS_ORIGINS,
		credentials: true,
	},
});

initializeSocket(io);

server.listen(port, () => {
	logger.info(`Pharbit API listening on port ${port}`);
});

export default server;