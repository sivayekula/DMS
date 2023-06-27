const Category= require("../schemas/category")

const categoryList= async (id)=> {
    try{
        let qry= id ? {id: id}: {}
        let cate= await Category.find(qry);
        return cate;
    }catch(err) {
        throw err
    }
}

const saveCategory= async (catObj)=> {
    try{
        let catery= await new Category(catObj).save();
        return catery
    }catch(err){
        throw err
    }
}



module.exports= {
    categoryList: categoryList,
    saveCategory: saveCategory
}