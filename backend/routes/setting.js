var express = require('express');
var Settings = require("../model/setting");
var router = express.Router();

/* Post users data. */
router.post('/', function(req, res, next) {

var post = new Settings({secret: req.body.secret, clientid: req.body.clientid, 
                          redirect: req.body.redirect, auth: req.body.auth, ownerid: req.body.ownerid});

console.log(post);

//save model to MongoDB
post.save(function (err) {
  if (err) {
    
        res.send({ errors: "error data not save" })
        return err;
  }
  else {
    console.log("Post saved");
      res.send({ message: "Data Successfully save" })
  }
});

});

/* GET run GIT Upgrade. */
router.get('/upgrade', function(req, res, next) {

var exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("cd /opt/aerohive/ && sh /opt/aerohive/git.sh", function(error, stdout, stderr) {
  if (!error) {
    console.log(stdout)
    res.send({message:'Upgrade Successfully'})
  } else {
    console.log(stderr)
    res.send({message:'Upgrade Failed'})
  }

});

});

/* GET users data. */
router.get('/', function(req, res, next) {

 Settings.find({}, function (err, setting) {
            res.json(setting);
        });

});

// update setting data
router.post('/update/:id', function(req, res, next) {

var uid = req.params.id;

var settingData = {
  ownerid: req.body.ownerid,
  auth: req.body.auth,
  redirect: req.body.redirect,
  clientid: req.body.clientid,
  secret: req.body.secret
};

Settings.update({"_id":uid},settingData, function(err,result){

  if(err){
    res.send({error:'User Failed to Update'})
  }
  else{
  res.send({message:'Settings Update Successfully'})
  console.log(result)

}

})

});


module.exports = router;
