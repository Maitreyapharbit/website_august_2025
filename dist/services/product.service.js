"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchService = exports.ProductService = void 0;
const database_1 = require("../config/database");
const error_1 = require("../middleware/error");
const http_status_codes_1 = require("http-status-codes");
class ProductService {
    static async create(data) {
        const { data: product, error } = await database_1.supabase
            .from('products')
            .insert({
            name: data.name,
            gtin: data.gtin,
            description: data.description || null,
            manufacturer_id: data.manufacturerId
        })
            .select()
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create product');
        return product;
    }
    static async list(filters) {
        let query = database_1.supabase.from('products').select('*');
        if (filters.manufacturerId) {
            query = query.eq('manufacturer_id', filters.manufacturerId);
        }
        const { data, error } = await query;
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch products');
        return data;
    }
    static async get(id) {
        const { data, error } = await database_1.supabase
            .from('products')
            .select(`
				*,
				batches(*),
				manufacturer:companies(*)
			`)
            .eq('id', id)
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Product not found');
        return data;
    }
}
exports.ProductService = ProductService;
class BatchService {
    static async create(productId, data) {
        const { data: batch, error } = await database_1.supabase
            .from('batches')
            .insert({
            batch_number: data.batchNumber,
            expiry_date: data.expiryDate.toISOString(),
            product_id: productId
        })
            .select()
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create batch');
        return batch;
    }
    static async get(id) {
        const { data, error } = await database_1.supabase
            .from('batches')
            .select(`
				*,
				product:products(*),
				shipments(*)
			`)
            .eq('id', id)
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Batch not found');
        return data;
    }
    static async updateLocation(batchId, location) {
        const { data, error } = await database_1.supabase
            .from('batches')
            .update({
            current_location: location,
            status: 'IN_TRANSIT'
        })
            .eq('id', batchId)
            .select()
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update batch location');
        return data;
    }
    static async updateStatus(batchId, status) {
        const { data, error } = await database_1.supabase
            .from('batches')
            .update({ status: status })
            .eq('id', batchId)
            .select()
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update batch status');
        return data;
    }
}
exports.BatchService = BatchService;
