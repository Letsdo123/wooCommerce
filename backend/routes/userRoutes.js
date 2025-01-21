import express from 'express'
import { registerUser, loginUser } from '../controllers/userController.js';

// This is the initialization of the user router
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);



export default router;