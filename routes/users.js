'use strict'
import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import checkAuth from '../middleware/checkAuth.js';
dotenv.config();
const secret= process.env.SECRET;

import  { 
    save, 
    list,
    search, 
    update,
    remove,
    updateState,
    autenticate,
    profile
}  from '../controllers/UserController.js';

router.route('/', checkAuth).get(checkAuth,list).post(checkAuth,save);
router.route('/:data').get(search);
router.route('/:id').put(update).delete(remove);
router.route('/updatestate/:id').put(updateState);
router.route('/login',autenticate).post(autenticate);

router.get("/profile/pro",checkAuth, list);



router.get('/publicp/p',(req,res)=>{
    res.send('nica');
});
  
router.post("/t/token", (req,res)=>{
  
    const{id: sub, name}={id:"cacevdo", name:"chris"};
  
    const token = jwt.sign({
      sub,
      name,
      exp: Date.now() + 60 *1000
    }, secret);
  
    res.send({token})
  
  })
  
    
  router.get("/p/private", (req, res)=>{
    try{
      const token = req.headers.authorization.split(" ")[1]
      const payload= jwt.verify(token, secret)
  
      if(Date.now()>payload.exp){
        return res.status(401).send({error:"token expired"})
      }
    res.send("private")
    }catch(error)
    {
      res.status(401).send({error:error.message})
    }
    
  } )
  
  
  


export default router;

