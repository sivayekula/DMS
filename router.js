const express= require("express");
const router= express.Router();
const user= require("./controllers/users")
const loginSchema = require("./utilities/login");
const { createCompany, getCompanies } = require("./controllers/company");
const sessionChecker = require("./config/tokenValidator");

router.get("/", (req, res)=> {
    if(req.session.token){
        res.redirect("/dashboard")
    } else {
        res.render('login');
    }
})

router.post("/login", loginSchema, user.login)
router.post("/createCompany", createCompany)
router.get("/companies", (req, res)=> {
    res.render("company")
})

router.get("/dashboard", sessionChecker ,(req, res)=> {
    res.render('dashboard');
})
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Your are logged out ");
});


module.exports = router;