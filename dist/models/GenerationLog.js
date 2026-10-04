"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerationLog = void 0;
const mongoose_1 = require("mongoose");
const generationLogSchema = new mongoose_1.Schema({
    posterId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Poster', required: true },
    geminiPromptUsed: { type: String, required: true },
    tokensUsed: { type: Number, default: 0 },
    latencyMs: { type: Number, default: 0 },
    success: { type: Boolean, required: true }
});
exports.GenerationLog = (0, mongoose_1.model)('GenerationLog', generationLogSchema);
