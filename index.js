import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // Import user routes
import taskRoutes from './routes/taskRoutes.js'; // Import task routes
import protectedRoutes from './routes/protectedRoutes.js'; // Import protected routes
import { connectDB } from './database/db.js'; // Import database connection function
import bodyParser from 'body-parser';
// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(bodyParser.json());
// CORS configuration
const corsOptions = {
  origin: "*",
  
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-access-token",
    "x-uploadthing-version",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 
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
