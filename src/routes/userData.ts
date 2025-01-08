import express from 'express';
import { getuserBookData, getuserDataHome, newUserslots } from '../controllers/userDataController';

// Create a router
const routerUser = express.Router();

// Define the routes
routerUser.get('/userdata',getuserDataHome);
routerUser.post('/userdata',newUserslots);
routerUser.get('/userbookeddata',getuserBookData)

// Export the router
export default routerUser;
