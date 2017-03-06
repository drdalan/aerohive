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

/* GET run GIT Upgrade. */
router.get('/alerts', function(req, res, next) {

var exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("sudo /bin/email", function(error, stdout, stderr) {
  if (!error) {
    console.log(stdout)
  } else {
    console.log(stderr)
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
