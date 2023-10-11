import express from 'express';
import { verifyToken } from '../middlewares/verifyUser';
import { addList, getAllList } from '../controllers/listController';

// variabels declaration
const router = express.Router();

// Routers

// @desc    add list routes
// @link   /api/v1/list/add
// @access  private
router.route('/add').post(verifyToken, addList);

// @desc    get all list routes
// @link   /api/v1/list/getall
// @access  public
router.route('/getall').get(getAllList);

export default router;