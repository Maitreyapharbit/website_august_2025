"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = initializeSocket;
exports.emitCompanyEvent = emitCompanyEvent;
exports.emitShipmentEvent = emitShipmentEvent;
let ioRef = null;
function initializeSocket(io) {
    ioRef = io;
    io.on('connection', (socket) => {
        socket.on('join:company', (companyId) => {
            socket.join(`company:${companyId}`);
        });
        // Additional rooms can be joined like shipment or batch
        socket.on('join:shipment', (shipmentId) => {
            socket.join(`shipment:${shipmentId}`);
        });
    });
}
function emitCompanyEvent(companyId, event, payload) {
    ioRef?.to(`company:${companyId}`).emit(event, payload);
}
function emitShipmentEvent(shipmentId, event, payload) {
    ioRef?.to(`shipment:${shipmentId}`).emit(event, payload);
}
