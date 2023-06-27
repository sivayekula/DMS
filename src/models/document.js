const Document= require("../schemas/documents");

const saveDocument= async (docObj)=> {
    try{
        let resp= await new Document(docObj).save()
        return resp
    } catch(error) {
        throw error
    }
}

const documentList= async (id)=> {
    try{
        let resp;
        if(id){
            resp= await Document.findOne({_id: id}).populate("category");
        }else {
            resp= await Document.find().populate("category");
        }
        return resp
    }catch(err) {
        throw err
    }
}

module.exports= {
    saveDocument: saveDocument,
    documentList: documentList
}