var express = require('express');
var Networksettings = require("../model/networksetting");
var router = express.Router();

/* Post users data. */
router.post('/', function(req, res, next) {

var post = new Networksettings({ipaddr: req.body.ipaddr, subnet: req.body.subnet, 
                          gateway: req.body.gateway, dns1: req.body.dns1, dns2: req.body.dns2, hostname: req.body.hostname});

console.log(post);

//save model to MongoDB
post.save(function (err) {
  if (err) {
    
        res.send({ errors: "Error Data not Saved" })
        return err;
  }
  else {
    console.log("Post saved");
      res.send({ message: "Data Successfully Saved" })
  }
});

});

/* GET Networksetting data. */
router.get('/', function(req, res, next) {

 Networksettings.find({}, function (err, setting) {
            res.json(setting);
        });

});

/* GET run GIT update. */
router.get('/gitupdate', function(req, res, next) {

var exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("sh bash.sh", function(error, stdout, stderr) {
  if (!error) {
    console.log(stdout)
  } else {
    console.log(stderr)
  }

});

});

/* GET run update network settings. */
router.get('/updatenetwork', function(req, res, next) {

var exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("sh networksetting.sh", function(error, stdout, stderr) {
  if (!error) {
    console.log(stdout)
  } else {
    console.log(stderr)
  }
});

});

/* GET run TEST update. */
router.get('/runbash', function(req, res, next) {

var exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("sh bash.sh", function(error, stdout, stderr) {
  if (!error) {
    console.log(stdout)
  } else {
    console.log(stderr)
  }
});

});

// update setting data
router.post('/update/:id', function(req, res, next) {

var uid = req.params.id;

var networksettingData = {
  ipaddr: req.body.ipaddr,
  subnet: req.body.subnet,
  gateway: req.body.gateway,
  dns1: req.body.dns1,
  dns2: req.body.dns2,
  hostname: req.body.hostname
};

Networksettings.update({"_id":uid},networksettingData, function(err,result){

  if(err){ 
    res.send({status: false, error:'Network Settings Failed to Update'})
  }
  else{
  res.send({status:true, message:'Network Settings Update Successfully'})
  console.log(result)

}

});

});

/* delete  users data. */
router.get('/delete/:id', function(req, res, next) {

var uid = req.params.id;

 Networksettings.remove({"_id":uid},function(err,result){

  if(err){
    res.send({error:'Error unable to Delete User'})
  }
  else{
  res.send({message:'User Successfully Delete'})
  console.log(result)

}

});
});


module.exports = router;
