
var mongoose = require('mongoose');

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var networksettingSchema = new mongoose.Schema({
    
     ipaddr: 'string',
     subnet: 'string',
     gateway: 'string',
     dns1: 'string',
     dns2: 'string',
     hostname: 'string'

});

var collectionName = 'networksetting'
module.exports = db.model('networksetting', networksettingSchema, collectionName)