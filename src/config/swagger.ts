import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options = {
	definition: {
		openapi: '3.0.3',
		info: {
			title: env.SWAGGER_TITLE,
			version: env.SWAGGER_VERSION,
			description: env.SWAGGER_DESCRIPTION,
		},
		servers: [
			{ url: `${env.BASE_URL}/api/v1` },
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

export const swaggerSpec = swaggerJsdoc(options as any);