"use strict"
const User= require("../schemas/users")
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config/config");

function getToken(tokenData) {
    let jwtToken = jwt.sign(tokenData, config.JWT_SECRET, { expiresIn: '1h' });
    return jwtToken
}

const loginService = async (body)=> {
    try {
        let user= await User.findOne({email: body.email}).populate("roleId")
        let passRes= await bcrypt.compare(body.password, user.password)
        if(user && passRes) {
            let token = getToken({_id: user._id, name: user.name, role: user.roleId.name})
            return token
        } else {
            throw new Error("Sorry! User not found with this email/password")
        }
    }catch(err) {
        throw err
    }
}

module.exports = {
    loginService: loginService
}