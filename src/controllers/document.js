"use strict";
const path = require('path');
const { saveDocument, documentList, getDocument } = require('../models/document');
const fs = require('fs');
const pdf2html = require('pdf2html');
const pdf = require('pdf-parse');
const HTMLtoDOCX = require("html-to-docx")
const HtmlDocx = require('html-docx-js');
var juice = require('juice');
const EasyDocx = require('node-easy-docx')
const WordExtractor = require("word-extractor"); 
const extractor = new WordExtractor();
// require("../../uploads/")
const createDocument= async (req, res)=> {
    try{
        let ext = path.extname(req.file.originalname)
        if (ext !== '.pdf') {
            fs.unlinkSync(req.file.path)
            res.status(400).json({status: 400, message: "Sorry! we are unable to save the document"})
        } else {
            let docObj= {docname: req.body.docName, name: req.file.filename, original_name: req.file.originalname, category: req.body.category, initiater: req.user._id, companyId: req.user.companyId, initiatedAt: Date.now(), reviewer: req.body.reviewer}
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
        let flter= req.user.role == "superAdmin" ? {} : req.user.role == "admin" ? {companyId: req.user.companyId} : {$or:[{initiater : req.user._id}, {reviewer : req.user._id}, {approver : req.user._id}]}
        let docs= await documentList(flter)
        res.status(200).json({status: 200, message: "Document saved successfully", data: docs})
    }catch(err) {
        res.status(400).json({status: 400, message: "Sorry! we are unable to get the documents"})
    }
}
const viewDocument= async (req, res)=> {
    try{ 
        let docs= await getDocument({_id: req.params.docId})
        res.render("viewDocument", {data: docs})
    }catch(err) {
        console.log(err)
        res.status(400).json({status: 400, message: "Sorry! we are unable to get the documents"})
    }
}

const updateDocument= async (req, res)=> {
    try{
        let htmlString= juice(req.body.htmltxt)
        // htmlString= await convertImagesToBase64(htmlString)
        let headerHTMLString= `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Document</title></head><body>`
        let footerHTMLString= `</body></html>`
        let documentOptions= {}
        let blob= await HTMLtoDOCX(htmlString, headerHTMLString, documentOptions, footerHTMLString)
        let resp= fs.writeFileSync("./uploads/sample.docx", blob)
        res.status(200).json({status: 200, message: "Document saved successfully"})
    }catch(err) {
        console.log(err)
        res.status(400).json({status: 400, message: "Sorry! we are unable to update the documents"})
    }
}


async function convertImagesToBase64 (htmlString) {
    contentDocument = htmlString;
    var regularImages = contentDocument.querySelectorAll("img");
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    [].forEach.call(regularImages, function (imgElement) {
      console.log(imgElement)
      // preparing canvas for drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = imgElement.width
      canvas.height = imgElement.height;
      console.log(imgElement.width, imgElement.height)
      ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
      // by default toDataURL() produces png image, but you can also export to jpeg
      // checkout function's documentation for more details
      var dataURL = canvas.toDataURL();
      imgElement.setAttribute('src', dataURL);
    })
    canvas.remove();
    return htmlString;
  }

module.exports= {
    createDocument: createDocument,
    getDocuments: getDocuments,
    viewDocument: viewDocument,
    updateDocument: updateDocument
}