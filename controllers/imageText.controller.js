import fs from 'fs-extra';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';
import tesseract from 'node-tesseract-ocr';
import ImageTextModel from '../models/ImageText.model.js';
import { callOpenAI } from '../utils/callOpenAi.js';

const extraceImageText = async (req, res) => {
    if (!req.file) {
        throw new BadRequestError('Image not uploaded');
    }

    const config = {
        lang: "eng",
        oem: 1,
        psm: 3
    };

    const extractedText = await tesseract.recognize(req.file.path, config);

    const openaiPrompt = 'Give me a comma separated list of all the bold sentences or words.';
    const openAiParts = [
        {
            type: 'text',
            text: openaiPrompt
        },
        {
            type: 'image_url',
            image_url: {
                url: `data:image/jpeg;base64,${fs.readFileSync(req.file.path).toString('base64')}`,
            }
        }
    ];

    let openaiResponse = '';
    try {
        openaiResponse = await callOpenAI(openAiParts);
    } catch (error) {
        console.error("Openai error:", error);
    }

    const imageText = await ImageTextModel.create({
        imageFilePath: req.file.path,
        extractedText,
        boldWords: openaiResponse,
        createdBy: req.user.id
    });

    return res.status(StatusCodes.CREATED).json({ success: true, imageText });
}

const getAllImageText = async (req, res) => {
    const queryObject = { createdBy: req.user.id };

    let result = ImageTextModel.find(queryObject).sort({ createdAt: -1 });
    const imageTexts = await result;

    const totalImageTexts = await ImageTextModel.countDocuments(queryObject);

    return res.status(StatusCodes.OK).json({ success: true, count: totalImageTexts, imageTexts });
}

export { extraceImageText, getAllImageText };