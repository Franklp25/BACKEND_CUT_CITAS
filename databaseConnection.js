
'use strict'
import mongoose from 'mongoose';

const uri = "mongodb+srv://Enma123:Kfzs7183@cluster0.k3iwr1b.mongodb.net/cut-citas_db?retryWrites=true&w=majority";

export default async function run() {
  try {
    mongoose.connect(uri || 'mongodb://localhost/cut-citas_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

