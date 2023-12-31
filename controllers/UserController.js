'use strict'
import User from '../models/Users.js';
import { sendSuccessResponse, sendErrorResponse } from '../middleware/responseHandler.js';
import generateJWT from '../middleware/generateJWT.js';
const save = async function (req, res) {
    try {
        const id = req.body.id;
        const username = req.body.username;
        const email = req.body.email;
        req.body.state = "A";
        const existingUser = await User.findOne({ $or: [{ id: id }, { username: username }, { email: email }] });
        if (existingUser) {
            if (existingUser.id === id) { 
                sendErrorResponse(res, 409, 'idError');
            } else if (existingUser.username === username) {
                sendErrorResponse(res, 409, 'usernameError');
            } else if (existingUser.email === email) {
                sendErrorResponse(res, 409, 'emailError');
            }
        } else {
           // const data = await User.insertMany(req.body);
           /// sendSuccessResponse(res, data[0], 'success');*/
           const user = new User(req.body);
           const usuarioalmacenado=await user.save();
           res.json(usuarioalmacenado);
        }
    } catch (error) {
        sendErrorResponse(res, 500, 'serverError');
    }
};

const list = async function (req, res) {
    try {
        const data = await User.find({});
        sendSuccessResponse(res, data, null);
    } catch (error) {
        sendErrorResponse(res, 500, 'serverError');
    }
};

const search = async function (req, res) {
    try {
        const id = req.params.data;
        const username = req.params.data;
        const email = req.params.data;
        const existingUser = await User.findOne({ $or: [{ id: id }, { username: username }, { email: email }] });
        if (existingUser) {
            sendSuccessResponse(res, existingUser, null);
        } else {
            sendErrorResponse(res, 404, 'notFound');
        }
    } catch (error) {
        sendErrorResponse(res, 500, 'serverError');
    }
};

//update the user data
const update = async function (req, res) {
    try {
        const id = req.body.id;
        const username = req.body.username;
        const email = req.body.email;
        const user = await User.findOne({ id: req.params.id });
        if (user) {
            const existingUser = await User.findOne({ $or: [{ id: id }, { username: username }, { email: email }] });
            if (!existingUser || (existingUser.id === user.id || existingUser.username === user.username || existingUser.email === user.email)) {
                const data = await User.updateOne({ id: req.params.id },
                    {
                        $set: {
                            id: req.body.id,
                            name: req.body.name,
                            lastname: req.body.lastname,
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            role: req.body.role
                        }
                    },
                    { new: true }
                );
                sendSuccessResponse(res, data, 'success');
            } else {
                if (existingUser.id === id) { 
                    sendErrorResponse(res, 409, 'idError');
                } else if (existingUser.username === username) {
                    sendErrorResponse(res, 409, 'usernameError');
                } else if (existingUser.email === email) {
                    sendErrorResponse(res, 409, 'emailError');
                }
            }
        } else {
            sendErrorResponse(res, 404, 'notFound');
        }
    } catch (error) {
        sendErrorResponse(res, 500, 'serverError');
    }
};

const updateState = async function (req, res) {
    try {
        const data = await User.updateOne({id: req.params.id}, {
            $set: {
                state: "I"
            },
        },
        { new: true });
        sendSuccessResponse(res, data, null);
    } catch (err){
        sendErrorResponse(res, 500, 'serverError');
    }
}

const remove = async function (req, res) {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (user) {
            const data = await User.deleteOne({ id: req.params.id });
            sendSuccessResponse(res, data, 'success');
        } else {
            sendErrorResponse(res, 404, 'notFound');
        }
    } catch (error) {
        sendErrorResponse(res, 500, 'serverError');
    }
};

const autenticate = async(req, res)=>{
const{email, password} = req.body;
const user = await User.findOne({email});
if(!user){
    sendErrorResponse(res, 404, 'user notFound');

}
if(await user.validatePassword(password)){

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id),
        });
}else{
    sendErrorResponse(res, 404, 'Password incorrecto');
}


/*console.log(user);
sendSuccessResponse(res, user, 'correcto');*/


}

const profile = async (req, res) =>{
const {user} = req;
res.json(user);
//console.log(user);
}

export {
    save,
    list,
    search,
    update,
    remove,
    updateState,
    autenticate,
    profile
};