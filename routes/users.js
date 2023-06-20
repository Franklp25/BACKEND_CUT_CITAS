'use strict'
import express from 'express';
const router = express.Router();
import  { 
    save, 
    list,
    search, 
    update,
    remove
}  from '../controllers/UserController.js';

router.route('/').get(list).post(save);
router.route('/:data').get(search);
router.route('/:id').put(update).delete(remove);

export default router;

