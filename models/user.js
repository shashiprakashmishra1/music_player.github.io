const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    name:{
        type: String, 
        required: true
    }, 
    user_type: {
        type: String,
        required: true,
        default: "normal"
    }
})

module.exports = user = mongoose.model('user',userSchema);
