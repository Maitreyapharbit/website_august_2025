"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkpointSchema = exports.shipmentCreateSchema = exports.sensorDataSchema = exports.sensorRegisterSchema = exports.batchCreateSchema = exports.productCreateSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.profileUpdateSchema = exports.refreshSchema = exports.loginSchema = exports.registerSchema = void 0;
const celebrate_1 = require("celebrate");
exports.registerSchema = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().min(8).required(),
        companyName: celebrate_1.Joi.string().required(),
        firstName: celebrate_1.Joi.string().allow('', null),
        lastName: celebrate_1.Joi.string().allow('', null),
    })
};
exports.loginSchema = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    })
};
exports.refreshSchema = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        refreshToken: celebrate_1.Joi.string().required(),
    })
};
exports.profileUpdateSchema = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        firstName: celebrate_1.Joi.string().allow('', null),
        lastName: celebrate_1.Joi.string().allow('', null),
    })
};
exports.forgotPasswordSchema = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        email: celebrate_1.Joi.string().email().required(),
    })
};
exports.resetPasswordSchema = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        email: celebrate_1.Joi.string().email().required(),
        token: celebrate_1.Joi.string().required(),
        newPassword: celebrate_1.Joi.string().min(8).required(),
    })
};
exports.productCreateSchema = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        name: celebrate_1.Joi.string().required(),
        gtin: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().allow('', null),
    })
};
exports.batchCreateSchema = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        batchNumber: celebrate_1.Joi.string().required(),
        expiryDate: celebrate_1.Joi.date().iso().required(),
    })
};
exports.sensorRegisterSchema = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        serial: celebrate_1.Joi.string().required(),
        productId: celebrate_1.Joi.string().uuid().allow(null),
    })
};
exports.sensorDataSchema = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        temperature: celebrate_1.Joi.number().required(),
        humidity: celebrate_1.Joi.number().allow(null),
        latitude: celebrate_1.Joi.number().allow(null),
        longitude: celebrate_1.Joi.number().allow(null),
    })
};
exports.shipmentCreateSchema = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        batchId: celebrate_1.Joi.string().uuid().required(),
        reference: celebrate_1.Joi.string().required(),
        origin: celebrate_1.Joi.string().required(),
        destination: celebrate_1.Joi.string().required(),
    })
};
exports.checkpointSchema = {
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        location: celebrate_1.Joi.string().required(),
        status: celebrate_1.Joi.string().required(),
        metadata: celebrate_1.Joi.object().unknown(true).optional(),
    })
};
