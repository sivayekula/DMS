const {saveRole, getUserRoles}= require("../models/roles");

const createRole= async (req, res)=> {
    try{
        let role= await saveRole(req.body)
        res.status(200).json({status: 200, message: "Role created successfully", data: role});
    }catch(err) {
        res.status(400).json({status: 400, message: err.message ? err.message : "Sorry!, We are unable to create role"})
    }
}

const getRoles= async (req, res)=> {
    try{
        let roles= await getUserRoles();
        res.status(200).json({status: 200, message: "User roles", data: roles});
    }catch(err){
        res.status(400).json({status: 400, message: err.message ? err.message : "Sorry!, We are unable to get roles"})
    }
}

module.exports= {
    createRole: createRole,
    getRoles: getRoles
}