const Role = require("../schemas/roles");


const saveRole= async (roleObj)=> {
    try {
        let role= await new Role(roleObj).save();
        return role;
    }catch(err){
        throw err
    }
}

const getRoles= async()=> {
    try{
        let roles= await Role.find({name:{$ne: "superAdmin"}});
        return roles
    }catch(err) {
        throw err
    }
}

module.exports= {
    saveRole: saveRole,
    getUserRoles: getRoles
}