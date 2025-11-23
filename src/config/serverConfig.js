import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DEV_DB_URL = process.env.DEV_DB_URL || 'mongodb://localhost:27017/devDB';
export const PROD_DB_URL = process.env.PROD_DB_URL || 'mongodb://localhost:27017/prodDB';

export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';

export const SMTP_EMAIL = process.env.SMTP_EMAIL || 'your_email@example.com';
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD || 'your_email_password';

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = process.env.REDIS_PORT || 6379;