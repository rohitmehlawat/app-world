const Validator=require('jsonschema').Validator;
const schemaValidator=new Validator();
const message=require('../schema/message');
const repository=require('../db/repository');
var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
router.post('/setMessage',function(req,res,next){
  let data=req.body;
  if(Object.keys(data).length!==0){
      res.send("success");
  }
  else{
    res.send("failure");
  }

});

router.get('/messageAPI',function(req,res,next){
    var data={
        "message":req.query.message,
        "docId":req.query.docId,
        "mFlag":req.query.mFlag
    };

   // const data=JSON.stringify(req.param.a);

    const result=schemaValidator.validate(data,message);
    if(result.valid){
      repository.saveMessage(data)
          .then((result)=>{
              if(data.mFlag==0){
                  res.send("displaySuccess");
              }
              else if(data.mFlag==1){
                  res.send("deletionSuccess");
              }
              else{
                  res.send("success");
              }

          })
          .catch((err)=>{
              res.send("failure");
          });

    }
    else{
      res.send(result.errors);
    }


});

router.post('/messageAPI',function(req,res,next){
    const data=req.body;

    const result=schemaValidator.validate(data,message);
    if(result.valid){
        repository.saveMessage(data)
            .then((result)=>{
                if(data.mFlag==0){
                    res.send("displaySuccess");
                }
                else if(data.mFlag==1){
                    res.send("deletionSuccess");
                }
                else{
                    res.send("success");
                }

            })
            .catch((err)=>{
                res.send("failure");
            });

    }
    else{
        res.send(result.errors);
    }


});

router.get('/displayDelete',function(req,res){

    if(req.query.flag==1){
        res.send('deletionSuccess');

    }
    else if(req.query.flag=0){
        res.send('displaySuccess');
    }
    else{
        res.send('failure');
    }
});

router.get('/message',function(req,res){

    if(req.query.message==undefined){
        res.send('failure');
    }
    else{
        res.send('success');
    }
});


module.exports = router;
