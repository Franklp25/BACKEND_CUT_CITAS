'use strict'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
        unique: true, 
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});
UserSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


const User = mongoose.model('users', UserSchema);

export default User;