
var mongoose = require('mongoose');

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var settingSchema = new mongoose.Schema({
    
     secret: 'string',
     clientid: 'string',
     redirect: 'string',
     auth: 'string',
     ownerid: 'string'

});

var collectionName = 'apisetting'
module.exports = db.model('setting', settingSchema, collectionName)
