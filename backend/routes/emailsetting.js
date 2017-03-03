var express = require('express');
var Email = require("../model/emailsetting");
var router = express.Router();

/* Post email data. */
router.post('/', function(req, res, next) {

var post = new Email({smtpHostname: req.body.smtpHostname, userName: req.body.userName, 
                          password: req.body.password, toAddr: req.body.toAddr, fromAddr: req.body.fromAddr,
                          subject: req.body.subject, smtpPort: req.body.smtpPort});

console.log(post);

//save model to MongoDB
post.save(function (err) {
  if (err) {
    
        res.send({ errors: "Unable To Save Settings" })
        return err;
  }
  else {
    console.log("Post saved");
      res.send({ message: "Email Settings Successfully save" })
  }
});

});

/* GET email data. */
router.get('/', function(req, res, next) {

 Email.find({}, function (err, setting) {
            res.json(setting);
        });

});

// update email data
router.post('/update/:id', function(req, res, next) {

var uid = req.params.id;

var emailData = {

  smtpHostname: req.body.smtpHostname,
  userName: req.body.userName,
  password: req.body.password,
  toAddr: req.body.toAddr,
  fromAddr: req.body.fromAddr,
  subject: req.body.subject,
  smtpPort: req.body.smtpPort

};

Email.update({"_id":uid},emailData, function(err,result){

  if(err){ 
    res.send({error:'Email Settings Failed to Update'})
  }
  else{
  res.send({message:'Email Settings Updated Successfully'})
  console.log(result)

}

})

});


module.exports = router;
