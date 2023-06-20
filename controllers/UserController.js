'use strict'
import User from '../models/Users.js';
import { sendSuccessResponse, sendErrorResponse } from '../middleware/responseHandler.js'

const userController = {};

const save = async function (req, res) {
    try {
        const id = req.body.id;
        const username = req.body.username;
        const email = req.body.email;
        const existingUser = await User.findOne({ $or: [{ id: id }, { username: username }, { email: email }] });
        console.log(existingUser);
        console.log(id)
        console.log(username)
        console.log(email)
        if (existingUser) {
            if (existingUser.id === id) { 
                sendErrorResponse(res, 409, 'Error, el número de cédula ingresado ya se encuentra asociado a otro usuario');
            } else if (existingUser.username === username) {
                sendErrorResponse(res, 409, 'Error, el nombre de usuario ingresado ya se encuentra asociado a otro usuario');
            } else if (existingUser.email === email) {
                sendErrorResponse(res, 409, 'Error, el correo eletrónico ingresado ya se encuentra asociado a otro usuario');
            }
        } else {
            const user = new User(req.body);
            const data = user.save();
            sendSuccessResponse(res, data, 'Registrado exitosamente');
        }
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, 500, 'Lo sentimos, ocurrió un problema con el servidor');
    }
};

const list = async function (req, res) {
    try {
        const data = await User.find({});
        sendSuccessResponse(res, data, null);
    } catch (error) {
        sendErrorResponse(res, 500, 'Lo sentimos, ocurrió un problema con el servidor');
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
            sendErrorResponse(res, 404, 'Usuario no encontrado');
        }
    } catch (error) {
        sendErrorResponse(res, 500, 'Lo sentimos, ocurrió un problema con el servidor');
    }
};

const update = async function (req, res) {
    try {
        const id = req.body.id;
        const username = req.body.username;
        const email = req.body.email;
        const existingUser = await User.findOne({ $or: [{ id: id }, { username: username }, { email: email }] });
        if (!existingUser) {
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
            sendSuccessResponse(res, data, 'Modificado exitosamente');
        } else {
            if (existingUser.id === id) { 
                sendErrorResponse(res, 409, 'Error, el número de cédula ingresado ya se encuentra asociado a otro usuario');
            } else if (existingUser.username === username) {
                sendErrorResponse(res, 409, 'Error, el nombre de usuario ingresado ya se encuentra asociado a otro usuario');
            } else if (existingUser.email === email) {
                sendErrorResponse(res, 409, 'Error, el correo eletrónico ingresado ya se encuentra asociado a otro usuario');
            }
        }
    } catch (error) {

        sendErrorResponse(res, 500, 'Lo sentimos, ocurrió un problema con el servidor');
    }
};

const remove = async function (req, res) {
    try {
        const data = await User.deleteOne({ id: req.params.id });
        sendSuccessResponse(res, data, 'Eliminado exitosamente');
    } catch (error) {
        sendErrorResponse(res, 500, 'Lo sentimos, ocurrió un problema con el servidor');
    }
};

export {
    save,
    list,
    search,
    update,
    remove
};