'use strict'
import User from '../models/Users.js';

let userController = {};

userController.save = async function (req, res) {
    let user = new User(req.body);
    let data = user.save();
    res.status(200).json({
        success: true,
        data: data
    })
};

userController.list = async function (req, res) {
    let data = await User.find({});
    res.status(200).json({
        success: true,
        data: data
    });
};

userController.search = async function (req, res) {
    let data = await User.findOne({ username: req.params.uname});
    res.status(200).json({
        success: true,
        data: data
    })

};

userController.update = async function (req, res) {
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
    res.status(200).json({
        success: true,
        data: data
    });
};

userController.delete = async function (req, res) {
    let data = await User.deleteOne({ id: req.params.id });
    res.status(200).json({
        success: true,
        data: data
    })
};

export default userController;