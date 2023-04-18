/*  Names: Diego Cruz and Neema Mwansembo 
    Date: 17th April 2023 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export const User = mongoose.model('User', userSchema);

const mongoDB = "mongodb+srv://dalonso:12345abc@cluster0.xotyrdx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect("mongodb+srv://dalonso:12345abc@cluster0.xotyrdx.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('Connected to mongo')
})
.catch((e:any)=>{
    console.log('failed to connect to mongo', e)
})
