import mongoose from "mongoose";

const ImageTextSchema = new mongoose.Schema({
    imageFilePath: {
        type: String,
        required: [true, 'Image file path is required']
    },
    extractedText: {
        type: String,
        required: [true, 'Extracted text is required']
    },
    boldWords: {
        type: String,
        default: '',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
}, { timestamps: true });

export default mongoose.model('image-text', ImageTextSchema);