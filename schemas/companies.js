const mongoose= require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  domain: {
    type: String
  },
  mobile: {
    type: String
  },
  logo: {
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


module.exports = mongoose.model("company", CompanySchema);