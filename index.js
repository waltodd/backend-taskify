import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // Import user routes
import taskRoutes from './routes/taskRoutes.js'; // Import task routes

import {connectDB} from './database/db.js'
// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to handle CORS
app.use(cors());



// Call the function to connect to the database
connectDB();

// Define routes
app.use('/api/users', authRoutes); // User-related routes
app.use('/api/tasks', taskRoutes); // Task-related routes

// Set the server to listen on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
