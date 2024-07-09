import express from 'express';
import { extraceImageText, getAllImageText } from '../controllers/imageText.controller.js';
import { multerUpload } from '../config.js';

const router = express.Router();

router.route('/').get(getAllImageText).post(multerUpload.single('image'), extraceImageText);

export default router;