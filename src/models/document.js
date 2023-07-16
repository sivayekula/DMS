const Document= require("../schemas/documents");

const saveDocument= async (docObj)=> {
    try{
        let resp= await new Document(docObj).save()
        return resp
    } catch(error) {
        throw error
    }
}

const documentList= async (qry)=> {
    try{
        let resp= await Document.find(qry).populate("category");
        return resp
    }catch(err) {
        throw err
    }
}

const getDocument= async(qry)=> {
    try{
        let resp= await Document.findOne(qry).populate("category");
        return resp
    }catch(err) {
        throw err
    }
}

module.exports= {
    saveDocument: saveDocument,
    documentList: documentList,
    getDocument: getDocument
}