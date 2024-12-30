import express, { Application } from 'express';
import { connectToMongoDB } from './db/mydb';
import userRoutes from './routes/userRoutes';

const app: Application = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB before starting the server
connectToMongoDB();

// Use the user routes
app.use('/users', userRoutes);

// Basic route for health check
app.get('/', (req:any, res:any) => {
    res.send('Welcome to the MongoDB Express App');
});

// Start the server
const PORT: number = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
