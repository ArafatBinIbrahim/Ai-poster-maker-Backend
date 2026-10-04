# AI Political Poster Maker - Backend

A robust TypeScript & Express.js backend for the **AI Political Poster Maker** platform. It handles user authentication, template management, user photo uploads, and the poster generation core logic integrated with MongoDB and Google Gemini API.

---

## 🛠️ Tech Stack
- **Language:** TypeScript, Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **AI Integration:** Google Gemini API
- **File Upload:** Cloudinary / Multer

---

## 🚀 Getting Started & Setup Instructions for Evaluators

Follow these simple steps to set up and run the backend locally on your machine:

### 1. Clone the Repository

git clone [https://github.com/ArafatBinIbrahim/Ai-poster-maker-Backend.git]

cd Ai-poster-maker-Backend


2. Install Dependencies
npm install

3. Environment Configuration
Create a .env file in the root directory by referencing the required variables below.

Note on MongoDB Connection:
For testing purposes, you can use your own MongoDB Atlas cluster connection string or a local MongoDB URI.
Replace <db_password> with your actual database password. like-

PORT=5000
MONGO_URI=mongodb+srv://<username>:<db_password>@cluster0.xxxxx.mongodb.net/political_poster_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4. Seed Initial Templates (Optional)
To populate initial political poster templates into the database, run:
npm run seed

5. Run the Server
npm run dev

Production Build & Start:--
npm run build
npm start

Method,Endpoint,Description
POST,/api/auth/register,Register a new user
POST,/api/auth/login,Authenticate user & issue JWT
GET,/api/templates,Retrieve curated poster templates
POST,/api/posters,Submit poster form & trigger generation
GET,/api/posters/:id,Get poster status and preview result
POST,/api/upload,Upload user photo for poster


👨‍💻 Author
Kazi Arafat Bin Ibrahim

BRAC University | Software Engineer & Full-Stack Developer
