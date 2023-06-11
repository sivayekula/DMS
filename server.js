"use strict";
const express= require("express");
const app= new express();
const config= require('./config/config');
const router = require("./router");
const db = require("./db");
const bodyParser= require("body-parser");
const cors= require("cors");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('./schemas/users');
const Company = require("./schemas/companies");
const Roles= require("./schemas/roles")
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(cors());
app.use(cookieParser());
app.use(session({
    name: "DMSSession",
    secret: 'DMS_secrect',
    saveUninitialized: false,
    resave: false,
    cookie: { 
        secure: false, // This will only work if you have https enabled!
        maxAge: 60000*30 // 1 min
    } 
}));
app.use(function(req, res, next) {
    if(req.session.token){
        let userObj = jwt.decode(req.session.token);
        console.log("inside session", userObj.name)
        res.locals.name= userObj.name
    }
    next();
});
app.set('view engine', 'ejs');
app.use(express.static("assets"))

app.use("/", router)

app.listen(config.PORT||8080, async ()=>{
    // let cpy = await new Company({name: "DMS"}).save()
    // let rl = await new Roles({name: "superAdmin"}).save()
    // console.log(cpy._id, rl._id)
    // await new User({name: "admin", email: "dmsadmin@gmail.com", password: "Admin@123", roleId: rl._id, companyId: cpy._id}).save()
    console.log(`Server is running on :: ${config.PORT}`)
})