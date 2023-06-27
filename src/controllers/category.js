const { categoryList, saveCategory } = require("../models/category")

const getCategories= async (req, res)=> {
    try{
        let catList= await categoryList();
        res.status(200).json({status: 200, message: "Category list", data: catList})
    }catch(err){
        res.status(400).json({status: 400, message: err.message ? err.message : "Sorry! we are unable to get category list"})
    }
}

const createCategory = async (req, res)=> {
    try{
        let cat= await saveCategory(req.body)
        res.status(200).json({status: 200, message: "Category created successfully", data: cat})
    }catch(err) {
        res.status(400).json({status: 400, message: err.message ? err.message : "Sorry! we are unable to save category"})
    }
}

module.exports= {
    getCategories: getCategories,
    createCategory: createCategory
}