const mongoose= require("mongoose");
const bcrypt= require('bcryptjs');
const config= require("../config/config")

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    createIndexes: { unique: true }
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
    default: 0
  },
  password: {
    type: String,
    required: true
  },
  profile_pic: {
    type: String
  },
  meta_info: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: "superAdmin"
  },
  company: {
    type: String,
    required: true,
    default: "DMS"
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

AdminSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(config.SALT_WORK_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });
  
  AdminSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
  };

module.exports = mongoose.model("admin", AdminSchema);