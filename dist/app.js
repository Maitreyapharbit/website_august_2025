"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const rateLimiter_1 = require("./config/rateLimiter");
const security_1 = require("./middleware/security");
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const index_1 = __importDefault(require("./routes/v1/index"));
const error_1 = require("./middleware/error");
const app = (0, express_1.default)();
// Core middleware
app.disable('x-powered-by');
app.use(express_1.default.json({ limit: '1mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Security and rate limiting
app.use(rateLimiter_1.limiter);
app.use(security_1.sanitizeRequest);
// Static files for downloads/reports if any
app.use('/static', express_1.default.static(path_1.default.join(process.cwd(), 'public')));
// Health check
app.use('/health', health_routes_1.default);
// API v1
app.use('/api/v1', index_1.default);
// 404 and error handling
app.use(error_1.notFoundHandler);
app.use(error_1.errorConverter);
app.use(error_1.globalErrorHandler);
exports.default = app;
