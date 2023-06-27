"use strict";
const mongoose= require("mongoose");

const CategorySchema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  status: {
    type: String,
    required: "true",
    enum: ['active', 'inactive'],
    default: "active"
  }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


module.exports = mongoose.model("category", CategorySchema);