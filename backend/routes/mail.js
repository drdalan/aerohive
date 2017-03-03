var express = require('express');
var router = express.Router();
var email = require('emailjs');

/* GET home page. */
router.post('/', function(req, res, next) {

//   res.send("Mail Page");

   console.log(req.body);

var server  = email.server.connect({
   host:    req.body.host,
   toaddr:    req.body.toaddr,
   fromaddr:    req.body.fromaddr,
   sub:    req.body.sub,
   user:    req.body.username,
   password:req.body.password,
   ssl:     true
});

// send the message and get a callback with an error or details of the message that was sent
server.send({
   text:    req.body.msg, 
   to:      req.body.toaddr,
   from:    req.body.fromaddr,
   cc:      "",
   subject: req.body.sub
}, function(err, message) { 

    if(err)
      res.send({ message: 'Error Sending E-mail' });
   else
      res.send({ message: 'Email Successfully Sent' });
    });
 
});

module.exports = router;
