const { loginService, saveUser, usersList } = require('../models/users')
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config/config");

const login = async (req, res)=> {
    try {
        let user = await loginService(req.body)
        let passRes= await bcrypt.compare(req.body.password, user.password)
        if(user && passRes) {
            let token = getToken({_id: user._id, name: user.name, role: user.roleId.name})
            req.session.token = token
            req.session.save()
            res.status(200).json({status: 200, message: "User logged successfully", data: token})
        } else {
            throw new Error("Sorry! User not found with this email/password")
        }
    } catch(err) {
        res.status(400).json({status: 400, message: err.message ? err.message : "Sorry! we are unable to login"})
    }
}

const getUsers= async (req, res)=> {
    try{
        let users= await usersList()
        res.status(200).json({status: 200, message: "Users list", data: users})
    }catch(err){
        res.status(400).json({status: 400, message: err.message ? err.message : "Sorry! we are unable to get users"})
    }
}

const createUser= async (req, res)=> {
    try{
        let user= await saveUser(req.body);
        res.status(200).json({status: 200, message: "User logged successfully", data: user})
    }catch(err) {
        res.status(400).json({status: 400, message: err.message ? err.message : "Sorry! we are unable to save"})
    }
}


function getToken(tokenData) {
    let jwtToken = jwt.sign(tokenData, config.JWT_SECRET, { expiresIn: '1h' });
    return jwtToken
}


module.exports= {
    login: login,
    createUser: createUser,
    getUsers: getUsers
}