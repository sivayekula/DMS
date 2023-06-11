const mongoose= require("mongoose");
const bcrypt= require('bcryptjs');
const config= require("../config/config")

const DocumentSchema = new mongoose.Schema({
  doc: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: "true",
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