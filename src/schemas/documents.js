const mongoose= require("mongoose");
const bcrypt= require('bcryptjs');
const config= require("../config/config")

const DocumentSchema = new mongoose.Schema({
  docname: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  original_name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "category"
  },
  initiater: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  initiatedAt: {
    type: Date
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  reviewedAt:{
    type: Date
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  requestedAt:{
    type: Date
  },
  approver:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  approvedAt: {
    type: Date
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    default: "active"
  },
  action: {
    type: String,
    required: true,
    enum: ["initiate", "correction", "reinitiated", "approved", "requested", "accepted"],
    default: "initiate"
  }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


module.exports = mongoose.model("document", DocumentSchema);