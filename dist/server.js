"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./config/logger");
const env_1 = require("./config/env");
const socket_1 = require("./realtime/socket");
const database_1 = require("./config/database");
const port = env_1.env.PORT;
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: env_1.env.CORS_ORIGINS,
        credentials: true,
    },
});
(0, socket_1.initializeSocket)(io);
// Initialize services before starting the server
async function startServer() {
    try {
        // Test database connection
        const dbConnected = await (0, database_1.testDatabaseConnection)();
        if (!dbConnected) {
            throw new Error('Database connection failed');
        }
        // Initialize Supabase
        await (0, database_1.initializeDatabase)();
        // Start the HTTP server
        server.listen(port, () => {
            logger_1.logger.info(`Pharbit API listening on port ${port}`);
            logger_1.logger.info('Server started successfully');
            logger_1.logger.info(`Health check available at: ${env_1.env.BASE_URL}/health`);
            logger_1.logger.info(`API documentation available at: ${env_1.env.BASE_URL}/api-docs`);
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to start server', { error });
        process.exit(1);
    }
}
// Graceful shutdown handling
process.on('SIGTERM', async () => {
    logger_1.logger.info('SIGTERM received, shutting down gracefully');
    server.close(async () => {
        process.exit(0);
    });
});
process.on('SIGINT', async () => {
    logger_1.logger.info('SIGINT received, shutting down gracefully');
    server.close(async () => {
        process.exit(0);
    });
});
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger_1.logger.error('Uncaught exception', { error });
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    logger_1.logger.error('Unhandled rejection', { reason, promise });
    process.exit(1);
});
// Start the server
startServer();
exports.default = server;
