import express from 'express';
import { registerUser, loginUser, googleSignUpUser, deleteAUser } from '../controllers/userController'

// variabels declaration
const router = express.Router();

// Routes

// @desc    Register user
// @link    /api/v1/user/registe
router.route('/register').post(registerUser);

// @desc    Login user
// @link    /api/v1/user/login
router.route('/login').post(loginUser);

// @desc    Google SignIn user
// @link    /api/v1/user/google
router.route('/google').post(googleSignUpUser);

// @desc    Login user
// @link    /api/v1/user/delete/:id
router.route('/delete/:id').delete(deleteAUser);

export default router;