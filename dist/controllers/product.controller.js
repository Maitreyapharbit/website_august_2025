"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchController = exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
const response_1 = require("../utils/response");
class ProductController {
    static async create(req, res, next) {
        try {
            const manufacturerId = req.user?.companyId;
            return (0, response_1.created)(res, await product_service_1.ProductService.create({ ...req.body, manufacturerId }));
        }
        catch (err) {
            next(err);
        }
    }
    static async list(req, res, next) {
        try {
            return (0, response_1.ok)(res, await product_service_1.ProductService.list({ manufacturerId: req.user?.companyId }));
        }
        catch (err) {
            next(err);
        }
    }
    static async get(req, res, next) {
        try {
            return (0, response_1.ok)(res, await product_service_1.ProductService.get(req.params.id));
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ProductController = ProductController;
class BatchController {
    static async create(req, res, next) {
        try {
            const { id } = req.params;
            const payload = { ...req.body, expiryDate: new Date(req.body.expiryDate) };
            return (0, response_1.created)(res, await product_service_1.BatchService.create(id, payload));
        }
        catch (err) {
            next(err);
        }
    }
    static async get(req, res, next) {
        try {
            return (0, response_1.ok)(res, await product_service_1.BatchService.get(req.params.batchId));
        }
        catch (err) {
            next(err);
        }
    }
    static async updateLocation(req, res, next) {
        try {
            return (0, response_1.ok)(res, await product_service_1.BatchService.updateLocation(req.params.batchId, req.body.location), 'Location updated');
        }
        catch (err) {
            next(err);
        }
    }
    static async updateStatus(req, res, next) {
        try {
            return (0, response_1.ok)(res, await product_service_1.BatchService.updateStatus(req.params.batchId, req.body.status), 'Status updated');
        }
        catch (err) {
            next(err);
        }
    }
}
exports.BatchController = BatchController;
