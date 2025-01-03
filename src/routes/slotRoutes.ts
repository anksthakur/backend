import express from 'express';
import {slotBook} from "../controllers/slotTimeControllers"

// Create a router
const slotRouter = express.Router();

// Define the routes

slotRouter.post('/slot', slotBook)

// Export the router
export default slotRouter;
