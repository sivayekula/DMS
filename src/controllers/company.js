const { saveCompany, companyList } = require("../models/company")

const createCompany = async (req, res)=> {
    try {
        let company= await saveCompany(req.body);
        res.status(200).json({status: 200, message: "company created successfully", data: company})
    }catch(err) {
        res.status(400).json({status: 400, message: err.message ? err.message : "Sorry! we are unable to save the details"})
    }
}

const getCompanies = async (req, res)=> {
    try{
        let company= await companyList();
        res.status(200).json({status: 200, message: "List of companies", data: company})
    }catch(err) {
        res.status(400).json({status: 500, message: err.message})
    }
}

module.exports = {
    createCompany: createCompany,
    getCompanies: getCompanies
}