var express = require('express');
var Admin = require("../model/admin");
var router = express.Router();

/* Post users data. */
router.post('/', function(req, res, next) {

var post = new Admin({userName: req.body.userName, fullName: req.body.fullName, 
												  password: req.body.password});

console.log(post);

//save model to MongoDB
post.save(function (err) {
  if (err) {
		
        res.send({ errors: "Error Data Unable To Save" })
        return err;
  }
  else {
  	console.log("Post saved");
      res.send({ message: "Data Successfully Save" })
  }
});

});


/* GET users data. */
router.get('/', function(req, res, next) {

 Admin.find({}, function (err, admin) {
            res.json(admin);
        });

});

/* GET users data. */
router.post('/login', function(req, res, next) {

 Admin.find({}, function (err, admin) {

     
    // res.send(admin)
            
         if(req.body.userName == admin[0].userName &&  req.body.password == admin[0].password){
             res.send({ status:true,message: 'Login Successfully'})
         }
         else{
               res.send({status: false,message: 'Invalid UserName or Password'})
         }
   
        });
});

// update users data
router.post('/update/:id', function(req, res, next) {

var uid = req.params.id;

var updateData = {
  userName: req.body.userName,
  fullName: req.body.fullName,
  passwrod: req.body.password
};

Admin.update({"_id":uid},updateData, function(err,result){

  if(err){ 
    res.send({error:'Error User Was Not Update'})
  }
  else{
  res.send({message:'User Updated Successfully'})
  console.log(result)

}


});

});

/* delete  users data. */
router.get('/delete/:id', function(req, res, next) {

  var uid = req.params.id;

   Admin.remove({"_id":uid},function(err,result){

    if(err){
      res.send({error:'Error unable to delete User'})
    }
    else{
    res.send({message:'User Successfully Deleted'})
    console.log(result)

  }

});
});



module.exports = router;
