"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const authRoutes_1 = __importDefault(require("./authRoutes"));
const blogRoutes_1 = __importDefault(require("./blogRoutes"));
const companyRoutes_1 = __importDefault(require("./companyRoutes"));
const contactRoutes_1 = __importDefault(require("./contactRoutes"));
const setupRoutes = (app) => {
    app.use('/api/auth', authRoutes_1.default);
    app.use('/api/blogs', blogRoutes_1.default);
    app.use('/api/company', companyRoutes_1.default);
    app.use('/api/contact', contactRoutes_1.default);
    app.get('/', (req, res) => {
        res.json({
            success: true,
            message: 'Pharbit API is running',
            version: '1.0.0',
            endpoints: {
                auth: '/api/auth',
                blogs: '/api/blogs',
                company: '/api/company',
                contact: '/api/contact',
                health: '/health'
            }
        });
    });
};
exports.setupRoutes = setupRoutes;
//# sourceMappingURL=index.js.map