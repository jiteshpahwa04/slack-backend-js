import nodemailer from 'nodemailer';
import { SMTP_EMAIL, SMTP_PASSWORD } from './serverConfig.js';

export default nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD
    }
});