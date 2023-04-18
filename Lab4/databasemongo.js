"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
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
exports.User = mongoose.model('User', userSchema);
const mongoDB = "mongodb+srv://dalonso:12345abc@cluster0.xotyrdx.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect("mongodb+srv://dalonso:12345abc@cluster0.xotyrdx.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
    console.log('Connected to mongo');
})
    .catch((e) => {
    console.log('failed to connect to mongo', e);
});
//# sourceMappingURL=databasemongo.js.map