import { Router } from 'express';
import { getUsers, addUser } from "../controllers/userControllers";

const router: Router = Router();

// routes
router.get('/', getUsers);      // Get all users
router.post('/', addUser);      // Add a new user

export default router;
