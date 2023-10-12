import express from 'express';
import { verifyToken } from '../middlewares/verifyUser';
import { addList, getAllList, getUserList, deleteListById, updateListById, getAListById } from '../controllers/listController';

// variabels declaration
const router = express.Router();

// Routers

// @desc    add list routes
// @link   /api/v1/listing/add
// @access  private
router.route('/add').post(verifyToken, addList);

// @desc    get all list routes
// @link   /api/v1/listing/getall
// @access  public
router.route('/getall').get(getAllList);

// @desc    get user specific list routes
// @link   /api/v1/listing/userList
// @access  private
router.route('/userList').get(verifyToken, getUserList);

// @desc    delete user specific list routes
// @link   /api/v1/listing/userList
// @access  private
router.route('/delete/:id').delete(verifyToken, deleteListById);

// @desc    update user specific list routes
// @link   /api/v1/listing/userList
// @access  private
router.route('/update/:id').patch(verifyToken, updateListById);

// @desc    get list by id
// @link   /api/v1/listing/getlist/:id
// @access  public
router.route('/getlist/:id').get(getAListById);


export default router;