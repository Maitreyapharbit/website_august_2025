"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorController = void 0;
const sensor_service_1 = require("../services/sensor.service");
const response_1 = require("../utils/response");
class SensorController {
    static async register(req, res, next) {
        try {
            const { serial, productId } = req.body;
            const sensor = await sensor_service_1.SensorService.register(req.user.companyId, serial, productId);
            return (0, response_1.created)(res, sensor);
        }
        catch (err) {
            next(err);
        }
    }
    static async pushData(req, res, next) {
        try {
            const reading = await sensor_service_1.SensorService.addReading(req.params.sensorId, req.body);
            return (0, response_1.created)(res, reading);
        }
        catch (err) {
            next(err);
        }
    }
    static async history(req, res, next) {
        try {
            const data = await sensor_service_1.SensorService.listReadings(req.params.sensorId, Number(req.query.take) || 100);
            return (0, response_1.ok)(res, data);
        }
        catch (err) {
            next(err);
        }
    }
    static async createAlert(req, res, next) {
        try {
            const alert = await sensor_service_1.SensorService.addAlert(req.user.companyId, { ...req.body, sensorId: req.params.sensorId });
            return (0, response_1.created)(res, alert);
        }
        catch (err) {
            next(err);
        }
    }
    static async listAlerts(req, res, next) {
        try {
            const alerts = await sensor_service_1.SensorService.listAlerts(req.user.companyId);
            return (0, response_1.ok)(res, alerts);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.SensorController = SensorController;
