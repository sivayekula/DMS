"use strict"
const User= require("../schemas/users")

const loginService = async (body)=> {
    try {
        let user= await User.findOne({email: body.email}).populate("roleId")
        return user
    }catch(err) {
        throw err
    }
}

const usersList= async (flter)=> {
    try{
        let qry= flter ? flter : {};
        let users= await User.find(qry).populate("companyId").populate("roleId");
        return users;
    }catch(err){
        throw err
    }
}

const saveUser= async (userObj)=> {
    try {
        let user= await new User(userObj).save();
        return user
    } catch(err) {
        throw err
    }
}

module.exports = {
    loginService: loginService,
    saveUser: saveUser,
    usersList: usersList
}