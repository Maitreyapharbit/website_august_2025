"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const accessSecret = env_1.env.JWT_ACCESS_SECRET;
const refreshSecret = env_1.env.JWT_REFRESH_SECRET;
function signAccessToken(payload) {
    const options = { expiresIn: env_1.env.JWT_ACCESS_EXPIRES };
    return jsonwebtoken_1.default.sign(payload, accessSecret, options);
}
function signRefreshToken(payload) {
    const options = { expiresIn: env_1.env.JWT_REFRESH_EXPIRES };
    return jsonwebtoken_1.default.sign(payload, refreshSecret, options);
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, accessSecret);
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, refreshSecret);
}
