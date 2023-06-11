const createCompany = (req, res)=> {
    try {
        res.status(200).json({status: 200, message: "company created successfully"})
    }catch(err) {
        res.status(400).json({status: 500, message: err.message})
    }
}

const getCompanies = (req, res)=> {
    try{
        res.render("company")
    }catch(err) {
        res.status(400).json({status: 500, message: err.message})
    }
}

module.exports = {
    createCompany: createCompany,
    getCompanies: getCompanies
}