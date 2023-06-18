'use strict'
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true, 
        index: true,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },   
    lastname: {
        type: String,
        required: true
    },
    username:{ 
        type: String,
        unique: true, 
        index: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        required: true
    }
});

const User = mongoose.model('users', UserSchema);

export default User;