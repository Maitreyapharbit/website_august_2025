import { Joi, Segments } from 'celebrate';

export const registerSchema = {
	[Segments.BODY]: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required(),
		companyName: Joi.string().required(),
		firstName: Joi.string().allow('', null),
		lastName: Joi.string().allow('', null),
	})
};

export const loginSchema = {
	[Segments.BODY]: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	})
};

export const refreshSchema = {
	[Segments.BODY]: Joi.object({
		refreshToken: Joi.string().required(),
	})
};

export const profileUpdateSchema = {
	[Segments.BODY]: Joi.object({
		firstName: Joi.string().allow('', null),
		lastName: Joi.string().allow('', null),
	})
};

export const forgotPasswordSchema = {
	[Segments.BODY]: Joi.object({
		email: Joi.string().email().required(),
	})
};

export const resetPasswordSchema = {
	[Segments.BODY]: Joi.object({
		email: Joi.string().email().required(),
		token: Joi.string().required(),
		newPassword: Joi.string().min(8).required(),
	})
};

export const productCreateSchema = {
	[Segments.BODY]: Joi.object({
		name: Joi.string().required(),
		gtin: Joi.string().required(),
		description: Joi.string().allow('', null),
	})
};

export const batchCreateSchema = {
	[Segments.BODY]: Joi.object({
		batchNumber: Joi.string().required(),
		expiryDate: Joi.date().iso().required(),
	})
};

export const sensorRegisterSchema = {
	[Segments.BODY]: Joi.object({
		serial: Joi.string().required(),
		productId: Joi.string().uuid().allow(null),
	})
};

export const sensorDataSchema = {
	[Segments.BODY]: Joi.object({
		temperature: Joi.number().required(),
		humidity: Joi.number().allow(null),
		latitude: Joi.number().allow(null),
		longitude: Joi.number().allow(null),
	})
};

export const shipmentCreateSchema = {
	[Segments.BODY]: Joi.object({
		batchId: Joi.string().uuid().required(),
		reference: Joi.string().required(),
		origin: Joi.string().required(),
		destination: Joi.string().required(),
	})
};

export const checkpointSchema = {
	[Segments.BODY]: Joi.object({
		location: Joi.string().required(),
		status: Joi.string().required(),
		metadata: Joi.object().unknown(true).optional(),
	})
};