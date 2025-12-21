const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// User creation logic
exports.register = async(req,res)=>{
    const {name,email,password} = req.body

    try {
        // hash password
        const hashedPassword = await bcrypt.hash(password,10)
        // create an instance of the user
        const user = new User({
            name:name,
            email:email,
            password:hashedPassword
        })
        // check if user exists
        const userExist = await User.findOne({email})
        if(userExist){
          return  res.send("User with the email already exists")
        }
        // save user on the db
        const newUser = await user.save()
        // confirm user creation
        if(newUser){
            res.status(201).json({newUser})
        }else{
            res.send("Could not create user at the moment")
        }

    } catch (error) {
res.send(error.message)
    }
}
// Login Logic
exports.login = async(req,res)=>{
    const {email,password} = req.body
    try {
        const isUser = await User.findOne({email})
        let token = await jwt.sign({id:isUser._id},process.env.JWT_SECRET,{expiresIn:'1hr'}) // sign(payload, jwtSecret, expireyDate)
        if(isUser && (await bcrypt.compare(password,isUser.password))){
            res.status(201).json({
                isUser,
                token
            })
        }else{
            res.status(404).json({success:false,message:"Invalid user credentials"})
        }
    } catch (error) {
        res.send(error.message)
    }
}
// Get All Users
exports.getAllUsers = async(req,res)=>{
    try {
        // getting users from the database and saving in a variable called 'user'
        const user = await User.find({})
        // checking if user exists
        if(!user){
            res.status(404).json({message:"No user found"})
        }
        // returning the users
        res.status(200).json({user})
    } catch (error) {
        res.send(error.message)
    }
}

// updating user
exports.updateUser = async(req,res)=>{
    // getting id from the request params
    const {id} = req.params
    const {name,email,password} = req.body

    try {
        const user = await User.findById(id)
        if(!user){
            res.send("User not found")
        }
        // Hashing the password using bcrypt
        const hashedPassword = await bcrypt.hash(password,10)
        const obj = {
            name:name,
            email:email,
            password:hashedPassword
        }
        const updatedUser = await User.findByIdAndUpdate(id,obj)
        if(!updatedUser){
            res.send('We could not create at the moment')
        }
        res.send(updatedUser)
    } catch (error) {
        res.send(error.message)
    }
}