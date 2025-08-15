import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { env } from '../config/env';
import { v4 as uuid } from 'uuid';

const uploadRoot = path.resolve(process.cwd(), env.UPLOAD_DIR);
if (!fs.existsSync(uploadRoot)) {
	fs.mkdirSync(uploadRoot, { recursive: true });
}

export const upload = multer({
	storage: multer.diskStorage({
		destination: (_req, _file, cb) => cb(null, uploadRoot),
		filename: (_req, file, cb) => {
			const ext = path.extname(file.originalname);
			cb(null, `${uuid()}${ext}`);
		},
	}),
	limits: { fileSize: 10 * 1024 * 1024 },
});