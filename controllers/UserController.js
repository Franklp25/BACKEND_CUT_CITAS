'use strict'
import User from '../models/Users.js';
import { sendSuccessResponse, sendErrorResponse } from '../middleware/responseHandler.js'

let userController = {};

userController.save = async function (req, res) {
    try {
        const existingUser = await User.findOne({ id: req.body.id });
        if (existingUser) {
            sendErrorResponse(res, 409, 'Error, el número de cédula ingresado ya se encuentra asociado a otro usuario');
        } else {
            let user = new User(req.body);
            let data = user.save();
            sendSuccessResponse(res, data, 'Registrado exitosamente');
        }
    } catch (error) {
        sendErrorResponse(res, 500, 'Lo sentimos, ocurrió un problema con el servidor');
    }
};

userController.list = async function (req, res) {
    try {
        let data = await User.find({});
        sendSuccessResponse(res, data, null);
    } catch (error) {
        sendErrorResponse(res, 500, 'Lo sentimos, ocurrió un problema con el servidor');
    }
};

userController.search = async function (req, res) {
    try {
        let user = await User.findOne({ username: req.params.uname});
        if (user) {
            sendSuccessResponse(res, user, null);
        } else {
            sendErrorResponse(res, 404, 'Usuario no encontrado');
        }
    } catch (error) {
        sendErrorResponse(res, 500, 'Lo sentimos, ocurrió un problema con el servidor');
    }
};

userController.update = async function (req, res) {
    try {
        let user = await User.findOne({ id: req.params.id });
        if (user) {
            let data = await User.updateOne({ id: req.params.id },
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
            sendErrorResponse(res, 404, 'Usuario no encontrado');
        }
    } catch (error) {
        sendErrorResponse(res, 500, 'Lo sentimos, ocurrió un problema con el servidor');
    }
};

userController.delete = async function (req, res) {
    try {
        let user = await User.findOne({ id: req.params.id });
        if (user) {
            let data = await User.deleteOne({ id: req.params.id });
            sendSuccessResponse(res, data, 'Eliminado exitosamente');
        } else {
            sendErrorResponse(res, 404, 'Usuario no encontrado');
        }
    } catch (error) {
        sendErrorResponse(res, 500, 'Lo sentimos, ocurrió un problema con el servidor');
    }
};

export default userController;