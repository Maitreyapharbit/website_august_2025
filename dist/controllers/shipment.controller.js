"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentController = void 0;
const shipment_service_1 = require("../services/shipment.service");
const response_1 = require("../utils/response");
class ShipmentController {
    static async create(req, res, next) {
        try {
            const companyId = req.user.companyId;
            return (0, response_1.created)(res, await shipment_service_1.ShipmentService.create({ ...req.body, companyId }));
        }
        catch (err) {
            next(err);
        }
    }
    static async list(req, res, next) {
        try {
            const companyId = req.user?.companyId;
            const status = req.query.status || undefined;
            return (0, response_1.ok)(res, await shipment_service_1.ShipmentService.list({ companyId, status }));
        }
        catch (err) {
            next(err);
        }
    }
    static async get(req, res, next) {
        try {
            return (0, response_1.ok)(res, await shipment_service_1.ShipmentService.get(req.params.id));
        }
        catch (err) {
            next(err);
        }
    }
    static async addCheckpoint(req, res, next) {
        try {
            return (0, response_1.ok)(res, await shipment_service_1.ShipmentService.addCheckpoint(req.params.id, req.body), 'Checkpoint added');
        }
        catch (err) {
            next(err);
        }
    }
    static async history(req, res, next) {
        try {
            return (0, response_1.ok)(res, await shipment_service_1.ShipmentService.history(req.params.id));
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ShipmentController = ShipmentController;
