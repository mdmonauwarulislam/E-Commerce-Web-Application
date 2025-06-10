const mongoose = require('mongoose');


const dbconnection = async (url) => {
    await mongoose.connect(url);
}

const db = mongoose.connection;

db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Connected to MongoDB successfully!'));

module.exports = { dbconnection};