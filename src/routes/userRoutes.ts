import express from 'express';
import { getuserData, loginUser, signupUser } from '../controllers/userControllers';

// Create a router
const router = express.Router();

// Define the routes
router.post('/auth/signup', signupUser);
router.post('/auth/login', loginUser);
router.get('/checktoken',getuserData)

// Export the router
export default router;
