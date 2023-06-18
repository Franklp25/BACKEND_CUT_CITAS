'use strict'
import express from 'express';
const router = express.Router();
import  userController  from '../controllers/UserController.js';

router.get('/list', userController.list);
router.get('/search/:uname', userController.search);

router.post('/save', userController.save);
router.post('/update/:id', userController.update);
router.post('/delete/:id', userController.delete)

export default router;

