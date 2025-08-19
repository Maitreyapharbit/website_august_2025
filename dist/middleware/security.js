"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeRequest = sanitizeRequest;
const xss_1 = __importDefault(require("xss"));
function sanitizeInPlace(value) {
    if (typeof value === 'string') {
        return;
    }
    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            if (typeof value[i] === 'string')
                value[i] = (0, xss_1.default)(value[i]);
            else if (value[i] && typeof value[i] === 'object')
                sanitizeInPlace(value[i]);
        }
        return;
    }
    if (value && typeof value === 'object') {
        for (const key of Object.keys(value)) {
            const v = value[key];
            if (typeof v === 'string')
                value[key] = (0, xss_1.default)(v);
            else if (v && typeof v === 'object')
                sanitizeInPlace(v);
        }
    }
}
function sanitizeRequest(req, res, next) {
    if (req.body && typeof req.body === 'object')
        sanitizeInPlace(req.body);
    // Skip req.query due to Express 5 immutability of the getter
    if (req.params && typeof req.params === 'object')
        sanitizeInPlace(req.params);
    next();
}
