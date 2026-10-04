import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import templateRoutes from './routes/templateRoutes';
import uploadRoutes from './routes/uploadRoutes';
import posterRoutes from './routes/posterRoutes';

dotenv.config();
connectDB();

const app = express();
// 🛠️ Ekhane limit bariye dao:
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(express.json());

// API Routes (Clean & Structured)
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/posters', posterRoutes);

app.get('/', (req, res) => {
  res.send('Political Poster Maker API is running .....');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});