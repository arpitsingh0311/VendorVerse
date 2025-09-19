// server/index.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './db/connectDB.js';
import userRoutes from './routes/user.routes.js';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3001;


// --- Middlewares ---
app.use(express.json()); 
app.use(cookieParser()); 
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));


// --- Routes ---
app.use('/api/user', userRoutes);


// --- Server and DB Connection ---
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});