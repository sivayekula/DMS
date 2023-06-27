const Role = require("../schemas/roles");


const saveRole= async (roleObj)=> {
    try {
        let role= await new Role(roleObj).save();
        return role;
    }catch(err){
        throw err
    }
}

const getRoles= async(id)=> {
    try{
        let qry= id ? {id: id} : {}
        let roles= await Role.find(qry);
        return roles
    }catch(err) {
        throw err
    }
}

module.exports= {
    saveRole: saveRole,
    getUserRoles: getRoles
}