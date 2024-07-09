import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
// connect-db
import connectDB from './db/connect.js';
// routes
import authRouter from './routes/auth.routes.js';
import imageTextRouter from './routes/imageText.routes.js';
// middleware
import NotFoundMiddleware from './middleware/not-found.middleware.js';
import ErrorHandlerMiddleware from './middleware/error-handler.middleware.js';
import AuthenticationMiddleware from './middleware/authentication.middleware.js';
// external security packages
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';

const app = express();
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
fs.ensureDir('uploads');

// inbuilt middleware
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, './uploads')));

// extrnal packages
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.set('trust proxy', 1);
app.use(helmet());
app.use(xss());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/image-text', AuthenticationMiddleware, imageTextRouter);

// middlewares
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server is listening to: ${PORT}`);
    connectDB(process.env.MONGO_URI);
});