import express from 'express';
import { registerUser, loginUser } from '../controllers/userController'

// variabels declaration
const router = express.Router();

// Routes

// @desc    Register user
// @link    /api/v1/registe
router.route('/register').post(registerUser);

// @desc    Login user
// @link    /api/v1/login
router.route('/login').post(loginUser);

export default router;