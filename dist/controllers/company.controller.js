"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const company_service_1 = require("../services/company.service");
const response_1 = require("../utils/response");
class CompanyController {
    /**
     * @openapi
     * /companies:
     *   get:
     *     summary: List verified pharma companies
     *     tags: [Companies]
     *     responses:
     *       200:
     *         description: OK
     */
    static async list(_req, res, next) {
        try {
            return (0, response_1.ok)(res, await company_service_1.CompanyService.list());
        }
        catch (err) {
            next(err);
        }
    }
    static async create(req, res, next) {
        try {
            return (0, response_1.created)(res, await company_service_1.CompanyService.create(req.body));
        }
        catch (err) {
            next(err);
        }
    }
    static async get(req, res, next) {
        try {
            return (0, response_1.ok)(res, await company_service_1.CompanyService.get(req.params.id));
        }
        catch (err) {
            next(err);
        }
    }
    static async update(req, res, next) {
        try {
            return (0, response_1.ok)(res, await company_service_1.CompanyService.update(req.params.id, req.body));
        }
        catch (err) {
            next(err);
        }
    }
    static async remove(req, res, next) {
        try {
            await company_service_1.CompanyService.remove(req.params.id);
            return (0, response_1.noContent)(res);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.CompanyController = CompanyController;
