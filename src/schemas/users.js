const mongoose= require("mongoose");
const bcrypt= require('bcryptjs');
const config= require("../config/config")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    createIndexes: { unique: true }
  },
  empId: {
    type: String
  },
  mobile: {
    type: String
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
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "role"
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "company"
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

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(config.SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});
  


module.exports = mongoose.model("user", UserSchema);