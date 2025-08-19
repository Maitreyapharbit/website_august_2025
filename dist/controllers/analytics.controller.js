"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const database_1 = require("../config/database");
const response_1 = require("../utils/response");
const dayjs_1 = __importDefault(require("dayjs"));
const error_1 = require("../middleware/error");
const http_status_codes_1 = require("http-status-codes");
class AnalyticsController {
    static async dashboardStats(req, res, next) {
        try {
            const companyId = req.user.companyId;
            const [productsResult, shipmentsResult, alertsResult] = await Promise.all([
                database_1.supabase.from('products').select('id', { count: 'exact' }).eq('manufacturer_id', companyId),
                database_1.supabase.from('shipments').select('id', { count: 'exact' }).eq('company_id', companyId),
                database_1.supabase.from('alerts').select('id', { count: 'exact' }).eq('company_id', companyId).eq('resolved', false),
            ]);
            const products = productsResult.count || 0;
            const shipments = shipmentsResult.count || 0;
            const openAlerts = alertsResult.count || 0;
            return (0, response_1.ok)(res, { products, shipments, openAlerts });
        }
        catch (err) {
            next(err);
        }
    }
    static async shipmentAnalytics(req, res, next) {
        try {
            const companyId = req.user.companyId;
            const { data: shipments, error } = await database_1.supabase
                .from('shipments')
                .select('status')
                .eq('company_id', companyId);
            if (error)
                throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch shipment analytics');
            // Group by status manually
            const byStatus = shipments.reduce((acc, shipment) => {
                const existing = acc.find(item => item.status === shipment.status);
                if (existing) {
                    existing._count._all++;
                }
                else {
                    acc.push({ status: shipment.status, _count: { _all: 1 } });
                }
                return acc;
            }, []);
            return (0, response_1.ok)(res, { byStatus });
        }
        catch (err) {
            next(err);
        }
    }
    static async temperatureTrends(req, res, next) {
        try {
            const companyId = req.user.companyId;
            const from = (0, dayjs_1.default)().subtract(30, 'day').toDate();
            const { data: sensors, error: sensorsError } = await database_1.supabase
                .from('sensors')
                .select('id')
                .eq('company_id', companyId);
            if (sensorsError)
                throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch sensors');
            const sensorIds = sensors.map((s) => s.id);
            const { data: readings, error: readingsError } = await database_1.supabase
                .from('sensor_readings')
                .select('temperature')
                .in('sensor_id', sensorIds)
                .gte('created_at', from.toISOString());
            if (readingsError)
                throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch sensor readings');
            // Simple aggregation
            const avg = readings.reduce((acc, r) => acc + r.temperature, 0) / Math.max(1, readings.length);
            return (0, response_1.ok)(res, { averageTemperature: avg, samples: readings.length });
        }
        catch (err) {
            next(err);
        }
    }
    static async alertsSummary(req, res, next) {
        try {
            const companyId = req.user.companyId;
            const { data: alerts, error } = await database_1.supabase
                .from('alerts')
                .select('type')
                .eq('company_id', companyId);
            if (error)
                throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch alerts');
            // Group by type manually
            const byType = alerts.reduce((acc, alert) => {
                const existing = acc.find(item => item.type === alert.type);
                if (existing) {
                    existing._count._all++;
                }
                else {
                    acc.push({ type: alert.type, _count: { _all: 1 } });
                }
                return acc;
            }, []);
            return (0, response_1.ok)(res, { byType });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AnalyticsController = AnalyticsController;
