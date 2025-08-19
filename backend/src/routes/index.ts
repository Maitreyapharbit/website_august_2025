import { Express } from 'express';
import authRoutes from './authRoutes';
import blogRoutes from './blogRoutes';
import companyRoutes from './companyRoutes';
import contactRoutes from './contactRoutes';

export const setupRoutes = (app: Express) => {
  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/blogs', blogRoutes);
  app.use('/api/company', companyRoutes);
  app.use('/api/contact', contactRoutes);

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Pharbit API is running',
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth',
        blogs: '/api/blogs',
        company: '/api/company',
        contact: '/api/contact',
        health: '/health'
      }
    });
  });
};