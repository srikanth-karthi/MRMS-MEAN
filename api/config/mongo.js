const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb://127.0.0.1/mrms', {
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
