import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DEV_DB_URL = process.env.DEV_DB_URL || 'mongodb://localhost:27017/devDB';
export const PROD_DB_URL = process.env.PROD_DB_URL || 'mongodb://localhost:27017/prodDB';

export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';