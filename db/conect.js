let mongoose = require('mongoose');

const connectDB = (URL) => {
    return mongoose.connect(URL)
    .then(() => console.log('Connected to MongoDB'));
}

module.exports = connectDB;
    
  