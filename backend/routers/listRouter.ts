import express from 'express';
import { verifyToken } from '../middlewares/verifyUser';
import { addList } from '../controllers/listController';

// variabels declaration
const router = express.Router();

// Routers

// @desc    add list routes
// @link   /api/v1/list/add
router.route('/add').post(verifyToken, addList);

export default router;