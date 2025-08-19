"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = ok;
exports.created = created;
exports.noContent = noContent;
function ok(res, data, message = 'OK') {
    return res.status(200).json({ success: true, message, data });
}
function created(res, data, message = 'Created') {
    return res.status(201).json({ success: true, message, data });
}
function noContent(res) {
    return res.status(204).send();
}
