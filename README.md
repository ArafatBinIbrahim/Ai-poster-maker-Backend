# AI Political Poster Maker - Backend

A TypeScript & Express.js backend for the **AI Political Poster Maker** platform. It handles user authentication, poster template management, user photo uploads, and the poster generation logic, backed by MongoDB and the Google Gemini API.

---

## Tech Stack

| Area | Technology |
|---|---|
| Language | TypeScript, Node.js |
| Framework | Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT (JSON Web Token) |
| AI Integration | Google Gemini API |
| Poster Rendering | Puppeteer (HTML to PNG) |
| File Upload | Multer (local) / Cloudinary |

---

## Prerequisites

Make sure these are installed before you start:

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)
- A MongoDB database: a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster **or** a local MongoDB

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ArafatBinIbrahim/Ai-poster-maker-Backend.git
cd Ai-poster-maker-Backend
```

### 2. Install dependencies

```bash
npm install
```

> The first install also downloads a Chromium browser for Puppeteer, so it may take a few minutes.

### 3. Create the uploads folder

```bash
mkdir uploads
```

Uploaded photos and generated posters are saved here.

### 4. Configure environment variables

Create a file named `.env` in the project root and add the following:

```env
# Server
PORT=5000

# Database (MongoDB Atlas or local)
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.xxxxx.mongodb.net/political_poster_db?retryWrites=true&w=majority

# Auth
JWT_SECRET=your_super_secret_jwt_key_here

# AI
GEMINI_API_KEY=your_google_gemini_api_key_here

# Cloudinary (optional, for cloud image storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**MongoDB notes**

- For testing, use your own Atlas connection string or a local one: `mongodb://127.0.0.1:27017/political_poster_db`
- Replace `<db_username>` and `<db_password>` with your real database user credentials (remove the `<` `>` brackets).
- If your password contains special characters (`@`, `#`, `/`, `:`), URL-encode them (for example `@` becomes `%40`).
- On Atlas, add your IP in **Network Access** (or `0.0.0.0/0` for development only).

> Never commit your `.env` file. Make sure `.env` is listed in `.gitignore`.

### 5. Seed initial templates (optional)

Populates the database with sample poster templates (Victory Day, Memorial, Election Campaign, Greetings, Eid/Festival):

```bash
npm run seed
```

You should see `Templates Seeded Successfully!`.

### 6. Run the server

**Development** (auto-restarts on file changes):

```bash
npm run dev
```

The API is now available at `http://localhost:5000`.

**Production:**

```bash
npm run build
npm start
```

---

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Log in and receive a JWT |
| GET | `/templates` | No | Get all active poster templates |
| POST | `/posters` | Yes | Submit poster details and trigger generation |
| GET | `/posters/:id` | Yes | Get poster status and preview result |
| POST | `/upload` | Yes | Upload a user photo (returns the image URL) |

### Authentication

Protected routes need the JWT in the request header:

```
Authorization: Bearer <your_token>
```

### Example requests

**Register**

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Your Name",
  "emailOrPhone": "you@example.com",
  "password": "your_password"
}
```

**Login**

```http
POST /api/auth/login
Content-Type: application/json

{
  "emailOrPhone": "you@example.com",
  "password": "your_password"
}
```

The response contains a `token`. Use it as the Bearer token for protected routes.

**Upload a photo**

```http
POST /api/upload
Content-Type: multipart/form-data

photo: <image file>
```

- Field name must be `photo`
- Allowed types: `jpg`, `jpeg`, `png`, `webp`
- Max size: 5 MB

Response:

```json
{ "url": "http://localhost:5000/uploads/1700000000000-photo.png" }
```

---

## Project Structure

```
backend/
├── uploads/              # Uploaded photos and generated posters
├── src/
│   ├── config/           # Database connection
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth (JWT) middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Poster renderer (Puppeteer)
│   ├── seed.ts           # Template seed script
│   └── server.ts         # App entry point
├── .env                  # Environment variables (not committed)
└── package.json
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with auto-reload |
| `npm run seed` | Insert sample templates into the database |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled production build |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `ECONNREFUSED` / timeout on MongoDB | Check `MONGO_URI`, internet connection, and Atlas **Network Access** IP list |
| `bad auth` | Wrong database username or password in `MONGO_URI` |
| `User already exists` on register | The user is already registered, use `/auth/login` instead |
| Uploaded image URL does not open | Make sure the `uploads/` folder exists and is served statically in `server.ts` |
| Bengali text looks broken in generated poster | Check your internet connection (the Hind Siliguri font loads from Google Fonts) |

---

## Author

**Kazi Arafat Bin Ibrahim**
BRAC University | Software Engineer & Full-Stack Developer
