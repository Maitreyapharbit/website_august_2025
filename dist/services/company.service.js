"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const database_1 = require("../config/database");
const error_1 = require("../middleware/error");
const http_status_codes_1 = require("http-status-codes");
class CompanyService {
    static async list() {
        const { data, error } = await database_1.supabase
            .from('companies')
            .select('*')
            .eq('is_verified', true);
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch companies');
        return data;
    }
    static async create(data) {
        const { data: company, error } = await database_1.supabase
            .from('companies')
            .insert(data)
            .select()
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create company');
        return company;
    }
    static async get(id) {
        const { data, error } = await database_1.supabase
            .from('companies')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Company not found');
        return data;
    }
    static async update(id, data) {
        const { data: company, error } = await database_1.supabase
            .from('companies')
            .update(data)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update company');
        return company;
    }
    static async remove(id) {
        const { error } = await database_1.supabase
            .from('companies')
            .delete()
            .eq('id', id);
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to delete company');
    }
}
exports.CompanyService = CompanyService;
