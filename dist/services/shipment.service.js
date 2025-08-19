"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentService = void 0;
const database_1 = require("../config/database");
const socket_1 = require("../realtime/socket");
const error_1 = require("../middleware/error");
const http_status_codes_1 = require("http-status-codes");
class ShipmentService {
    static async create(data) {
        const { data: shipment, error } = await database_1.supabase
            .from('shipments')
            .insert({
            reference: data.reference,
            batch_id: data.batchId,
            origin: data.origin,
            destination: data.destination,
            company_id: data.companyId,
            status: 'CREATED',
            checkpoints: []
        })
            .select()
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create shipment');
        return shipment;
    }
    static async list(filters) {
        let query = database_1.supabase.from('shipments').select('*');
        if (filters.companyId) {
            query = query.eq('company_id', filters.companyId);
        }
        if (filters.status) {
            query = query.eq('status', filters.status);
        }
        const { data, error } = await query;
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch shipments');
        return data;
    }
    static async get(id) {
        const { data, error } = await database_1.supabase
            .from('shipments')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Shipment not found');
        return data;
    }
    static async addCheckpoint(id, checkpoint) {
        const { data: shipment, error: fetchError } = await database_1.supabase
            .from('shipments')
            .select('*')
            .eq('id', id)
            .single();
        if (fetchError || !shipment)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Shipment not found');
        const existing = shipment.checkpoints || [];
        const next = [...existing, { ...checkpoint, at: new Date().toISOString() }];
        const { data: updated, error: updateError } = await database_1.supabase
            .from('shipments')
            .update({
            checkpoints: next,
            status: checkpoint.status
        })
            .eq('id', id)
            .select()
            .single();
        if (updateError)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to add checkpoint');
        (0, socket_1.emitShipmentEvent)(id, 'shipment:checkpoint', updated);
        (0, socket_1.emitCompanyEvent)(shipment.company_id, 'shipment:checkpoint', updated);
        return updated;
    }
    static async history(id) {
        const { data, error } = await database_1.supabase
            .from('shipments')
            .select('checkpoints')
            .eq('id', id)
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Shipment not found');
        return data;
    }
}
exports.ShipmentService = ShipmentService;
