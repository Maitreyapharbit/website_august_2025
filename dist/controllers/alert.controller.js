"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertController = void 0;
const sensor_service_1 = require("../services/sensor.service");
const response_1 = require("../utils/response");
class AlertController {
    static async list(req, res, next) {
        try {
            const companyId = req.user.companyId;
            const alerts = await sensor_service_1.SensorService.listAlerts(companyId);
            return (0, response_1.ok)(res, alerts);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AlertController = AlertController;
