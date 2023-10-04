'use strict'
import express from 'express';
const router = express.Router();
import  { 
    save, 
    list,
    search, 
    update,
    remove,
    updateState
}  from '../controllers/UserController.js';

router.route('/').get(list).post(save);
router.route('/:data').get(search);
router.route('/:id').put(update).delete(remove);
router.route('/updatestate/:id').put(updateState);

export default router;

