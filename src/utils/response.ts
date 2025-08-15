import { Response } from 'express';

export function ok(res: Response, data: any, message = 'OK') {
	return res.status(200).json({ success: true, message, data });
}

export function created(res: Response, data: any, message = 'Created') {
	return res.status(201).json({ success: true, message, data });
}

export function noContent(res: Response) {
	return res.status(204).send();
}