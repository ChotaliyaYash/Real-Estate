import express from 'express';
import { registerUser, loginUser, googleSignUpUser, deleteAUser, updateUser, signOutUser } from '../controllers/userController'
import { verifyToken } from '../middlewares/verifyUser'

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
router.route('/delete/:id').delete(verifyToken, deleteAUser);

// @desc    Update user
// @link    /api/v1/user/update/:id
router.route('/update/:id').patch(verifyToken, updateUser);

// @desc    Signout user
// @link    /api/v1/user/update/:id
router.route('/signout').get(signOutUser);

export default router;