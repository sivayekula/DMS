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

app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}))
app.use(bodyParser.json({limit: '5mb'}));

app.use(cors());
app.use(cookieParser());
app.use(session({
    name: "DMSSession",
    secret: 'DMS_secrect',
    saveUninitialized: false,
    resave: false,
    cookie: { 
        secure: false, // This will only work if you have https enabled!
        maxAge: 60000*120 // 2 hours
    } 
}));
app.use(function(req, res, next) {
    if(req.session.token){
        let userObj = jwt.decode(req.session.token);
        res.locals.user= JSON.stringify(userObj)
    }
    next();
});
app.set('view engine', 'ejs');
app.use(express.static("assets"))
app.use(express.static('uploads'))

app.use("/", router)

app.listen(config.PORT||8080, async ()=>{
    // let cpy = await new Company({name: "DMS"}).save()
    // let rl = await new Roles({name: "superAdmin"}).save()
    // console.log(cpy._id, rl._id)
    // await new User({name: "admin", email: "dmsadmin@gmail.com", password: "Admin@123", roleId: rl._id, companyId: cpy._id}).save()
    console.log(`Server is running on :: ${config.PORT}`)
})