# AI Political Poster Maker - Backend

A TypeScript and Express.js REST API for the **AI Political Poster Maker** platform. It handles user authentication, poster template management, photo uploads, and poster generation, using **MongoDB Atlas** for data and **Cloudinary** for image storage.

---

## Tech Stack

| Area | Technology |
|---|---|
| Language | TypeScript, Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| File storage | Cloudinary (uploads handled with Multer) |
| AI | Google Gemini API |
| Poster rendering | Puppeteer |
| Auth | JWT (JSON Web Tokens), bcryptjs |

---

## Prerequisites

Please make sure you have the following before you start:

- **Node.js** v18 or higher ([download](https://nodejs.org))
- **npm** (comes with Node.js)
- A free **MongoDB Atlas** account ([sign up](https://www.mongodb.com/atlas))
- A free **Cloudinary** account ([sign up](https://cloudinary.com))
- A **Google Gemini API key** ([get one](https://aistudio.google.com/app/apikey))

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

### 3. Set up MongoDB Atlas

1. Create a free **M0** cluster on MongoDB Atlas.
2. Go to **Database Access** and create a database user (username and password).
3. Go to **Network Access** and add your IP address. For local testing you can use `0.0.0.0/0` (allow from anywhere).
4. Click **Connect > Drivers** and copy the connection string.

### 4. Set up Cloudinary

1. Sign in to your Cloudinary dashboard.
2. Go to **Settings > API Keys**.
3. Copy your **Cloud Name**, **API Key**, and **API Secret**.

### 5. Configure environment variables

Create a file named `.env` in the project root and add the following:

```env
# Server
PORT=5000

# Database (MongoDB Atlas)
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.xxxxx.mongodb.net/political_poster_db?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# AI
GEMINI_API_KEY=your_google_gemini_api_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Notes:**

- Replace `<db_username>` and `<db_password>` with your Atlas database user credentials (remove the `< >` brackets).
- If your password contains special characters such as `@`, `#`, or `/`, URL-encode them (for example `@` becomes `%40`).
- The database name (`political_poster_db`) is created automatically on first use.
- Never commit your `.env` file. It is already listed in `.gitignore`.

### 6. Seed the initial templates (recommended)

This inserts sample Bangladeshi poster templates (Victory Day, Memorial, Election Campaign, Greetings, Eid) into the database. Run it once:

```bash
npm run seed
```

You should see `Templates Seeded Successfully!` in the terminal.

> Running the seed script again clears existing templates and re-inserts the defaults.

### 7. Run the server

**Development** (auto-restarts on file changes):

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

**Production:**

```bash
npm run build
npm start
```

---

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Log in and receive a JWT token | No |
| GET | `/templates` | Get the list of poster templates | No |
| POST | `/upload` | Upload a user photo (form-data, key: `photo`) | Yes |
| POST | `/posters` | Submit the poster form and start generation | Yes |
| GET | `/posters/:id` | Get poster status and preview result | Yes |

### Using protected routes

After logging in, send the token in the request header:

```
Authorization: Bearer <your_token>
```

### Example: register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Your Name",
  "emailOrPhone": "you@example.com",
  "password": "your_password"
}
```

### Example: upload a photo

Send a `POST` request to `/api/upload` as `multipart/form-data` with a file field named `photo`.
Allowed formats: JPG, JPEG, PNG, WEBP. Maximum size: 5 MB.

---

## Project Structure

```
backend/
├── src/
│   ├── config/         # Database and service configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth and other middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API route definitions
│   ├── utils/          # Helpers (poster renderer, etc.)
│   ├── seed.ts         # Template seed script
│   └── server.ts       # App entry point
├── .env                # Environment variables (not committed)
├── package.json
└── tsconfig.json
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with auto-reload |
| `npm run build` | Compile TypeScript to the `dist/` folder |
| `npm start` | Run the compiled production build |
| `npm run seed` | Insert sample templates into the database |

---

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `MongooseServerSelectionError` or timeout | Your IP is not allowed in Atlas. Add it under **Network Access** (or use `0.0.0.0/0` for testing). |
| `bad auth` error | Wrong database username or password in `MONGO_URI`. |
| `Not authorized, no token` | Missing `Authorization: Bearer <token>` header. Log in first to get a token. |
| Image upload fails | Check the Cloudinary credentials in `.env`, and make sure the file is JPG, PNG, or WEBP and under 5 MB. |
| Port already in use | Change `PORT` in `.env`, or stop the other process using port 5000. |

---

## Author

**Kazi Arafat Bin Ibrahim**
Software Engineer and Full-Stack Developer, BRAC University
