import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // Import user routes
import taskRoutes from './routes/taskRoutes.js'; // Import task routes
import protectedRoutes from './routes/protectedRoutes.js'; // Import protected routes
import { connectDB } from './database/db.js'; // Import database connection function

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"], // Allowed domains
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-access-token",
    "x-uploadthing-version", // Removed trailing space
  ],
  credentials: true, // If you need to include credentials (like cookies)
};

// Use CORS middleware before defining routes
app.use(cors(corsOptions));

// Call the function to connect to the database
connectDB();

// Define routes
app.use('/api/v1/users', authRoutes); // User-related routes
app.use('/api/v1/tasks', taskRoutes); // Task-related routes
app.use('/api', protectedRoutes); // Protected routes

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Set the server to listen on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
