# AI Political Poster Maker - Backend

A TypeScript and Express.js REST API for the AI Political Poster Maker platform. It handles user authentication, poster template management, photo uploads, and poster generation, using MongoDB Atlas for data and Cloudinary for image storage.

---

## 🛠️ Tech Stack

| Area | Technology |
| :--- | :--- |
| **Language** | TypeScript, Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **File storage** | Cloudinary (uploads handled with Multer) |
| **Poster Rendering** | Puppeteer |
| **Auth** | JWT (JSON Web Tokens), bcryptjs |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ArafatBinIbrahim/Ai-poster-maker-Backend.git
cd Ai-poster-maker-Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up MongoDB Atlas & Cloudinary

Create a `.env` file in the project root and add your configuration:

```env
# Server
PORT=5000

# Database (MongoDB Atlas)
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.xxxxx.mongodb.net/political_poster_db?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Seed the initial templates

Inserts sample Bangladeshi poster templates (Victory Day, Memorial, Election Campaign, Greetings, Eid):

```bash
npm run seed
```

### 5. Run the server

- **Development:** `npm run dev`
- **Production:** `npm run build && npm start`

---

## 📡 API Endpoints

| Method | Endpoint | Auth required | Description |
| :--- | :--- | :--- | :--- |
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Log in and receive a JWT token |
| GET | `/templates` | No | Get the list of poster templates |
| POST | `/upload` | Yes | Upload a user photo (form-data, key: `photo`) |
| POST | `/posters` | Yes | Submit the poster form and start generation |
| GET | `/posters/:id` | Yes | Get poster status and preview result |

---

## 👨‍💻 Author

**Kazi Arafat Bin Ibrahim**

BRAC University | Software Engineer & Full-Stack Developer
