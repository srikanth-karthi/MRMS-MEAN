const obj = {
    _id: new ObjectId('658b1e59380267ac7b7f37c9')
  };
  
  // Get the ID as a string without using MongoDB-specific methods
  const id = String(obj._id).split('(')[1].split(')')[0];
  
  console.log(id); // Outputs: '658b1e59380267ac7b7f37c9'

  const user = require('./model/Userfile');
  