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
  url:
  {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin','user', 'hospital'],
    required: true,
  },
  uploadername:
  {
    type: String || Number,

    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: String,
    default: ''
  },
});

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user','hospital'],
    required: true,
  },
  uploadername:
  {
    type: String || Number,
    required: true,
  },
  folders: [this], 
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
  filesize:{
    type: Number,
    default:0
  },
  folders: [folderSchema],
  outsideFiles: {
    type: [fileSchema],
    default: [],
  },
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
