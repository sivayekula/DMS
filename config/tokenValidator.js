const jwt = require('jsonwebtoken');
const config = require('./config');

const sessionChecker = (req, res, next) => {    
    // console.log(`Session Checker: ${req.session.token}`);
    if (req.session.token) {
        try {
            let decoded = jwt.verify(req.session.token, config.JWT_SECRET)
            req.user= decoded;
            next();
        }catch(err) {
            res.redirect('/');
        }
    } else {
        // console.log(`No User Session Found`);
        res.redirect('/');
    }
};

module.exports = sessionChecker