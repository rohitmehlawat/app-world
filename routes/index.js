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

module.exports = router;
