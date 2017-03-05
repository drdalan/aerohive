
var mongoose = require('mongoose');

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var emailSchema = new mongoose.Schema({

    smtpHostname: 'string',
    userName: 'string',
    password: 'string',
    toAddr: 'string',
    fromAddr: 'string',
    subject: 'string',
    smtpPort: 'string',

});

var collectionName = 'emailsetting'
module.exports = db.model('email', emailSchema, collectionName)
