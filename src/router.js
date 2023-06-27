const express= require("express");
const router= express.Router();
const user= require("./controllers/users")
const loginSchema = require("./utilities/login");
const { createCompany, getCompanies } = require("./controllers/company");
const {sessionChecker} = require("./config/tokenValidator");
const { createCategory, getCategories } = require("./controllers/category");
const { createRole, getRoles } = require("./controllers/roles");
const { createUser, getUsers } = require("./controllers/users");
const { createDocument, getDocuments, viewDocument } = require("./controllers/document")
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            cb( null, Date.now()+""+ path.extname(file.originalname));
        }
    }
);

const upload = multer( { storage: storage } );


router.get("/", (req, res)=> {
    if(req.session.token){
        res.redirect("/dashboard")
    } else {
        res.render('login');
    }
})

router.post("/login", loginSchema, user.login)
router.get("/users", sessionChecker, (req, res)=> {
    res.render("users")
})
router.get("/getUsers", sessionChecker, getUsers)
router.post("/createUser", sessionChecker, createUser)
router.get("/dashboard", sessionChecker ,(req, res)=> {
    res.render('dashboard');
})
router.get("/companies", sessionChecker, (req, res)=> {
    res.render("company")
})
router.get("/getCompanies", sessionChecker, getCompanies)
router.post("/createCompany", sessionChecker, createCompany)
router.get("/documents", sessionChecker, (req, res)=> {
    res.render("documents")
})
router.get("/getdocuments", sessionChecker, getDocuments)
router.post("/createDocument", sessionChecker, upload.single('file'), createDocument)
router.get("/viewDocument/:docId", sessionChecker, viewDocument)

router.get("/roles", sessionChecker, (req, res)=> {
    res.render("roles")
})

router.get("/getRoles", sessionChecker, getRoles)
router.post("/createRole", sessionChecker, createRole)

router.get("/categories", sessionChecker, (req, res)=> {
    res.render("categories")
})
router.get("/getCategories", sessionChecker, getCategories)
router.post("/createCategory", sessionChecker, createCategory)

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Your are logged out ");
});
 


module.exports = router;