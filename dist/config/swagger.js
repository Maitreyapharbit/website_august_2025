"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const env_1 = require("./env");
const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: env_1.env.SWAGGER_TITLE,
            version: env_1.env.SWAGGER_VERSION,
            description: env_1.env.SWAGGER_DESCRIPTION,
        },
        servers: [
            { url: `${env_1.env.BASE_URL}/api/v1` },
        ],
        components: {
            schemas: {},
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
        tags: [
            { name: 'Auth' },
            { name: 'Companies' },
            { name: 'Products' },
            { name: 'Batches' },
            { name: 'Sensors' },
            { name: 'Shipments' },
            { name: 'Reports' },
            { name: 'Analytics' },
            { name: 'Alerts' },
        ],
    },
    apis: ['src/routes/**/*.ts', 'src/controllers/**/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
