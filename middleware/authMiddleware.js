const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

/*
jwt means Json Web Token and it's used to sign and verify tokens for authentication
*/
exports.protect = async(req,res,next)=>{
    let token;
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        }
        if(!token){
            res.status(404).json({message:"Not authorized, no token"})
        }
        // verify token
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        // attach the request user to the deocded token
        req.user = await User.findById(decode.id).select("-password")
        if(!req.user){
            res.status(404).json({message:"User no longer exist"})
        }
        next()
    } catch (error) {
        res.send(error.message)
    }
}

