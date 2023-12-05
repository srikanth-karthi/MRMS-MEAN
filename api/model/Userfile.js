const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  Originalname: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  folders: [this], // Reference to the same schema type
  files: {
    type: [fileSchema],
    default: [],
  },
});

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  folders: [folderSchema],
  outsideFiles: {
    type: [fileSchema],
    default: [],
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
