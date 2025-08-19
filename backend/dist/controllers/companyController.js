"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const companyService_1 = require("../services/companyService");
class CompanyController {
    static async getCompanyInfo(req, res, next) {
        try {
            const company = await companyService_1.CompanyService.getCompanyInfo();
            const response = {
                success: true,
                message: 'Company information retrieved successfully',
                data: company
            };
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateCompanyInfo(req, res, next) {
        try {
            const updates = req.body;
            const company = await companyService_1.CompanyService.updateCompanyInfo(updates);
            const response = {
                success: true,
                message: 'Company information updated successfully',
                data: company
            };
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=companyController.js.map