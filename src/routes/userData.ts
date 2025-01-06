import express from 'express';
import { getuserDataHome, newUserslots } from '../controllers/userDataController';

// Create a router
const routerUser = express.Router();

// Define the routes
routerUser.get('/userdata',getuserDataHome);
routerUser.post('/userdata',newUserslots);


// Export the router
export default routerUser;
