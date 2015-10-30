var express             =   require('express');
var router              =   express.Router();
var multer              =   require('multer');
var upload              =   multer({ dest: 'uploads/'}).single('avatar');
var fs = require('fs');
var path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/photo', function(req, res){
    console.log('/-----------------------');
    console.log('Inside post of photo');
    console.log(req.file);
    
    
    upload(req, res, function(err){
        if(err){
            return res.send('Error uploading file.');
        }
       
        fs.rename(req.file.path, '/home/ubuntu/workspace/public/images/uploads/' + req.file.originalname, function(err){
            if(err){
                res.send('failed mvoing file but uploaded');
            }
            fs.unlink(req.file.path, function(err){
                if(err) {
                    console.log('ERROR DELETING ------------ ');
                    console.log(err);
                }
            });
            res.render('index', {
                imagepath : req.file.originalname
            });
        });
        
    });
});

module.exports = router;
