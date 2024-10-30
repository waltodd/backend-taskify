import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // Import user routes
import taskRoutes from './routes/taskRoutes.js'; // Import task routes
import protectedRoutes from "./routes/protectedRoutes.js";
import {connectDB} from './database/db.js'
// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"], // Adicione todos os domínios permitidos aqui
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-access-token ",
    "x-uploadthing-version",
  ],
};

app.use(cors(corsOptions));

// Call the function to connect to the database
connectDB();

// Define routes
app.use('/api/v1/users', authRoutes); // User-related routes
app.use('/api/v1/tasks', taskRoutes); // Task-related routes


// Protected routes
app.use("/api", protectedRoutes);

// Middleware to handle CORS
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

// Set the server to listen on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
