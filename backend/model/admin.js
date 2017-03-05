
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://USERNAME:PASSWORD@HOSTNAME:27017/aerohive';

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var adminSchema = new mongoose.Schema({
    
     userName: 'string',
     fullName:  'string',
     password: 'string'

});

var collectionName = 'admin'
module.exports = db.model('admin', adminSchema, collectionName)