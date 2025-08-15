import { Server } from 'socket.io';

let ioRef: Server | null = null;

export function initializeSocket(io: Server) {
	ioRef = io;
	io.on('connection', (socket) => {
		socket.on('join:company', (companyId: string) => {
			socket.join(`company:${companyId}`);
		});
		// Additional rooms can be joined like shipment or batch
		socket.on('join:shipment', (shipmentId: string) => {
			socket.join(`shipment:${shipmentId}`);
		});
	});
}

export function emitCompanyEvent(companyId: string, event: string, payload: any) {
	ioRef?.to(`company:${companyId}`).emit(event, payload);
}

export function emitShipmentEvent(shipmentId: string, event: string, payload: any) {
	ioRef?.to(`shipment:${shipmentId}`).emit(event, payload);
}