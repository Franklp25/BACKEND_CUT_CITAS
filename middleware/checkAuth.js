import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

const checkAuth = async (req, res, next) =>{
    let token;
    /////console.log("desde check.js");
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
try{

    token = req.headers.authorization.split(" ")[1];
   
    const decoded = jwt.verify(token, process.env.SECRET);

    
req.user = await User.findById(decoded.id).select("-password -lastname -role -state -__v");
//console.log(req.user);
return next();
}catch(error){
    //retornar error
    return res.status(404).json({msg: "error"})
}

}
if(!token){
    const error = new Error("token no valido");
   return  res.status(404).json({msg: error.message});
}

next();
};

export default checkAuth;