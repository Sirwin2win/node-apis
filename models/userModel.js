const mongoose = require('mongoose')
// npm i bcrytp jsonwebtoken

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:["Name is required"]
    },
    email:{
        type:String,
        required:["Email is required"]
    },
    password:{
        type:String,
        required:["Password is required"]
    },
},{timestamps:true})

const User = mongoose.model("User",userSchema)
module.exports = User
