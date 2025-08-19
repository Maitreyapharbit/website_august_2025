"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorService = void 0;
const database_1 = require("../config/database");
const socket_1 = require("../realtime/socket");
const mailer_1 = require("../utils/mailer");
const error_1 = require("../middleware/error");
const http_status_codes_1 = require("http-status-codes");
class SensorService {
    static async register(companyId, serial, productId) {
        const { data, error } = await database_1.supabase
            .from('sensors')
            .insert({
            company_id: companyId,
            serial,
            product_id: productId || null
        })
            .select()
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to register sensor');
        return data;
    }
    static async addReading(sensorId, data) {
        const { data: reading, error } = await database_1.supabase
            .from('sensor_readings')
            .insert({
            sensor_id: sensorId,
            temperature: data.temperature,
            humidity: data.humidity || null,
            latitude: data.latitude || null,
            longitude: data.longitude || null
        })
            .select()
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to add sensor reading');
        return reading;
    }
    static async listReadings(sensorId, take = 100) {
        const { data, error } = await database_1.supabase
            .from('sensor_readings')
            .select('*')
            .eq('sensor_id', sensorId)
            .order('created_at', { ascending: false })
            .limit(take);
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch sensor readings');
        return data;
    }
    static async addAlert(companyId, payload) {
        const { data: alert, error } = await database_1.supabase
            .from('alerts')
            .insert({
            company_id: companyId,
            type: payload.type,
            message: payload.message,
            shipment_id: payload.shipmentId || null,
            sensor_id: payload.sensorId || null
        })
            .select()
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create alert');
        (0, socket_1.emitCompanyEvent)(companyId, 'alert:new', alert);
        if (payload.shipmentId)
            (0, socket_1.emitShipmentEvent)(payload.shipmentId, 'alert:new', alert);
        // email notification (best-effort)
        const { data: company } = await database_1.supabase
            .from('companies')
            .select('email')
            .eq('id', companyId)
            .single();
        if (company?.email) {
            void (0, mailer_1.sendMail)(company.email, `Pharbit Alert: ${payload.type}`, `<p>${payload.message}</p>`).catch(() => { });
        }
        return alert;
    }
    static async listAlerts(companyId) {
        const { data, error } = await database_1.supabase
            .from('alerts')
            .select('*')
            .eq('company_id', companyId)
            .order('created_at', { ascending: false });
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch alerts');
        return data;
    }
}
exports.SensorService = SensorService;
