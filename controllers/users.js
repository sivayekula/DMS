const { loginService } = require('../models/users')
const {validateLogin} = require('../utilities/login')

const login = async (req, res)=> {
    try {
        let userToken = await loginService(req.body)
        req.session.token = userToken
        req.session.save()
        res.status(200).json({status: 200, message: "User logged successfully", data: userToken})
    } catch(error) {
        res.status(400).json({status: 400, message: error.message})
    }
}



module.exports= {
    login: login
}