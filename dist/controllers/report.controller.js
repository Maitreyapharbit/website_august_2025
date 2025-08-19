"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const response_1 = require("../utils/response");
const database_1 = require("../config/database");
const json2csv_1 = require("json2csv");
const pdfkit_1 = __importDefault(require("pdfkit"));
const dayjs_1 = __importDefault(require("dayjs"));
const error_1 = require("../middleware/error");
const http_status_codes_1 = require("http-status-codes");
class ReportController {
    static async compliance(req, res, next) {
        try {
            const companyId = req.user.companyId;
            const { data: reports, error } = await database_1.supabase
                .from('compliance_reports')
                .select('*')
                .eq('company_id', companyId);
            if (error)
                throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch compliance reports');
            return (0, response_1.ok)(res, reports);
        }
        catch (err) {
            next(err);
        }
    }
    static async temperature(req, res, next) {
        try {
            const companyId = req.user.companyId;
            const from = req.query.from ? new Date(String(req.query.from)) : (0, dayjs_1.default)().subtract(7, 'day').toDate();
            const to = req.query.to ? new Date(String(req.query.to)) : new Date();
            const { data: sensors, error: sensorsError } = await database_1.supabase
                .from('sensors')
                .select('id')
                .eq('company_id', companyId);
            if (sensorsError)
                throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch sensors');
            const sensorIds = sensors.map((s) => s.id);
            const { data, error } = await database_1.supabase
                .from('sensor_readings')
                .select('*')
                .in('sensor_id', sensorIds)
                .gte('created_at', from.toISOString())
                .lte('created_at', to.toISOString())
                .order('created_at', { ascending: true });
            if (error)
                throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch temperature data');
            return (0, response_1.ok)(res, data);
        }
        catch (err) {
            next(err);
        }
    }
    static async export(req, res, next) {
        try {
            const { type, format } = req.body;
            const companyId = req.user.companyId;
            let rows = [];
            if (type === 'shipments') {
                const { data, error } = await database_1.supabase
                    .from('shipments')
                    .select('*')
                    .eq('company_id', companyId);
                if (error)
                    throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch shipments');
                rows = data;
            }
            if (type === 'alerts') {
                const { data, error } = await database_1.supabase
                    .from('alerts')
                    .select('*')
                    .eq('company_id', companyId);
                if (error)
                    throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch alerts');
                rows = data;
            }
            if (type === 'temperature') {
                const { data: sensors, error: sensorsError } = await database_1.supabase
                    .from('sensors')
                    .select('id')
                    .eq('company_id', companyId);
                if (sensorsError)
                    throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch sensors');
                const sensorIds = sensors.map((s) => s.id);
                const { data, error } = await database_1.supabase
                    .from('sensor_readings')
                    .select('*')
                    .in('sensor_id', sensorIds)
                    .limit(1000);
                if (error)
                    throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch sensor readings');
                rows = data;
            }
            if (format === 'csv') {
                const parser = new json2csv_1.Parser();
                const csv = parser.parse(rows);
                res.header('Content-Type', 'text/csv');
                res.attachment(`${type}-${Date.now()}.csv`);
                return res.send(csv);
            }
            const doc = new pdfkit_1.default();
            res.setHeader('Content-Type', 'application/pdf');
            doc.pipe(res);
            doc.fontSize(16).text(`Pharbit Export: ${type}`, { underline: true });
            doc.moveDown();
            rows.slice(0, 100).forEach((row) => doc.fontSize(10).text(JSON.stringify(row)));
            doc.end();
        }
        catch (err) {
            next(err);
        }
    }
    static async auditTrail(req, res, next) {
        try {
            const productId = req.params.productId;
            const { data: logs, error } = await database_1.supabase
                .from('audit_logs')
                .select('*')
                .eq('product_id', productId)
                .order('created_at', { ascending: true });
            if (error)
                throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch audit logs');
            return (0, response_1.ok)(res, logs);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.ReportController = ReportController;
