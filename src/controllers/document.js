"use strict";
const path = require('path');
const { saveDocument, documentList } = require('../models/document');
const fs = require('fs');
const pdf2html = require('pdf2html');
const createDocument= async (req, res)=> {
    try{
        let ext = path.extname(req.file.originalname)
        if (ext !== '.pdf') {
            fs.unlinkSync(req.file.path)
            res.status(400).json({status: 400, message: "Sorry! we are unable to save the document"})
        } else {
            let docObj= {docname: req.body.docName, name: req.file.filename, original_name: req.file.originalname, category: req.body.category, initiater: req.user._id, initiatedAt: Date.now(), reviewer: req.body.reviewer}
            let docRes= await saveDocument(docObj)
            res.status(200).json({status: 200, message: "Document saved successfully", data: docRes})
        }
        
    }catch(err){
        fs.unlinkSync(req.file.path)
        res.status(400).json({status: 400, message: "Sorry! we are unable to save the document"})
    }
}

const getDocuments= async (req, res)=> {
    try{
        let docs= await documentList()
        res.status(200).json({status: 200, message: "Document saved successfully", data: docs})
    }catch(err) {
        res.status(400).json({status: 400, message: "Sorry! we are unable to get the documents"})
    }
}
const viewDocument= async (req, res)=> {
    try{
        let docs= await documentList(req.params.docId)
        const html = await pdf2html.html("../../uploads/"+docs.name);
        console.log(html);
        res.render("viewDocument", {data: docs})
    }catch(err) {
        res.status(400).json({status: 400, message: "Sorry! we are unable to get the documents"})
    }
}

module.exports= {
    createDocument: createDocument,
    getDocuments: getDocuments,
    viewDocument: viewDocument
}