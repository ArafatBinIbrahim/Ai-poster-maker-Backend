"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_js_1 = require("./config/db.js");
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const templateRoutes_js_1 = __importDefault(require("./routes/templateRoutes.js"));
const uploadRoutes_js_1 = __importDefault(require("./routes/uploadRoutes.js"));
const posterRoutes_js_1 = __importDefault(require("./routes/posterRoutes.js"));
dotenv_1.default.config();
(0, db_js_1.connectDB)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve static uploaded photos & generated posters
app.use('/uploads', express_1.default.static('uploads'));
// API Routes (Clean & Structured)
app.use('/api/auth', authRoutes_js_1.default);
app.use('/api/templates', templateRoutes_js_1.default);
app.use('/api/upload', uploadRoutes_js_1.default);
app.use('/api/posters', posterRoutes_js_1.default);
app.get('/', (req, res) => {
    res.send('Political Poster Maker API is running .....');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
