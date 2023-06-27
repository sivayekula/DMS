"use strict";
const Company= require("../schemas/companies");


const saveCompany= async (cpyObj)=> {
    try{
        let company= await new Company(cpyObj).save();
        return company
    }catch(err) {
        throw err
    }
}

const companyList= async (id)=> {
    try{
        let qry= id ? {id: id} : {};
        let company= await Company.find(qry);
        return company
    }catch(err) {
        throw err
    }
}

module.exports= {
    saveCompany: saveCompany,
    companyList: companyList
}