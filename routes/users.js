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

// router.get('/list', userController.list);
// router.get('/search/:data', userController.search);

// router.post('/save', userController.save);
// router.post('/update/:id', userController.update);
// router.post('/delete/:id', userController.delete);
router.route('/').get(list).post(save);
router.route('/:data').get(search);

router.route('/:id').put(update).delete(remove);

export default router;

