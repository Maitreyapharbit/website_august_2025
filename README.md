# Pharbit API (PHB)

Backend API for Pharbit, a blockchain-based pharmaceutical supply chain tracking system.

## Tech
- Node.js, Express
- PostgreSQL, Prisma
- Redis (cache, sessions)
- JWT auth with refresh
- Socket.io (realtime alerts)
- Joi/Celebrate validation
- Swagger/OpenAPI docs
- Multer uploads, Nodemailer emails
- Helmet, CORS, rate limiting

## Setup
1. Copy `.env.example` to `.env` and adjust values.
2. Install deps: `npm install`
3. Prisma: `npx prisma migrate dev --name init`
4. Start dev: `npm run dev`
5. Swagger UI: `/api-docs`
6. Health: `/health`

## Scripts
- `npm run dev` — run dev server with ts-node/tsx
- `npm run build` — compile TypeScript
- `npm start` — run compiled build

## Notes
- API base path: `/api/v1`
- Roles: ADMIN, COMPANY, VIEWER
- Rate limit: default 100 req / 15min / IP