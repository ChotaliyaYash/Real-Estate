import express from 'express';
import { registerUser } from '../controllers/userController'

// variabels declaration
const router = express.Router();



// Routes

// @desc    Register user
// @link    /api/v1/registe
router.route('/register').post(registerUser);

export default router;