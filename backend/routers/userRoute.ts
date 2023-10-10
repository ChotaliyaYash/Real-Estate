import express from 'express';
import { registerUser, loginUser, googleSignUpUser, deleteAUser, updateUser } from '../controllers/userController'

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

// @desc    Delete user
// @link    /api/v1/user/delete/:id
router.route('/delete/:id').delete(deleteAUser);

// @desc    Update user
// @link    /api/v1/user/update/:id
router.route('/update/:id').patch(updateUser);

export default router;