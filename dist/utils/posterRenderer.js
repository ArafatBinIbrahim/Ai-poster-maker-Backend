"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePosterImage = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const generatePosterImage = async (options) => {
    const browser = await puppeteer_1.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
                width: 1080px;
                height: 1350px;
                font-family: 'Hind Siliguri', sans-serif;
                background: url('${options.templateBgUrl}') no-repeat center center;
                background-size: cover;
                position: relative;
                overflow: hidden;
            }
            .overlay-content {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 60px;
            }
            .slogan-box {
                background: rgba(255, 255, 255, 0.95);
                padding: 20px 40px;
                border-radius: 15px;
                text-align: center;
                font-size: 32px;
                font-weight: 700;
                color: #1b5e20;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            }
            .user-section {
                display: flex;
                align-items: center;
                background: linear-gradient(135deg, #0d47a1 0%, #1976d2 100%);
                padding: 35px;
                border-radius: 20px;
                color: white;
                box-shadow: 0 15px 35px rgba(0,0,0,0.3);
                border: 4px solid #ffeb3b;
            }
            .user-photo {
                width: 220px;
                height: 220px;
                border-radius: 50%;
                object-fit: cover;
                border: 6px solid #fff;
                box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            }
            .user-info {
                margin-left: 40px;
            }
            .user-name {
                font-size: 46px;
                font-weight: 700;
                color: #ffeb3b;
                margin-bottom: 8px;
            }
            .user-designation, .user-party {
                font-size: 26px;
                font-weight: 600;
                color: #e0f7fa;
                margin-bottom: 4px;
            }
        </style>
    </head>
    <body>
        <div class="overlay-content">
            <div class="slogan-box">
                "${options.caption || 'জনগণের অধিকার, আমাদের অঙ্গীকার'}"
            </div>
            <div class="user-section">
                <img src="${options.photoUrl}" class="user-photo" alt="User Photo" />
                <div class="user-info">
                    <div class="user-name">${options.name}</div>
                    <div class="user-designation">${options.designation}</div>
                    <div class="user-party">${options.party} - ${options.district}</div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
    await page.setContent(htmlContent, { waitUntil: 'load' });
    const uploadsDir = path_1.default.resolve('uploads');
    if (!fs_1.default.existsSync(uploadsDir)) {
        fs_1.default.mkdirSync(uploadsDir, { recursive: true });
    }
    const fileName = `poster_${Date.now()}.png`;
    const filePath = path_1.default.join(uploadsDir, fileName);
    await page.screenshot({ path: filePath, type: 'png' });
    await browser.close();
    return `/uploads/${fileName}`;
};
exports.generatePosterImage = generatePosterImage;
