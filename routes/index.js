var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const filePath = './uploads';

  const images = fs.readdirSync(filePath);

  console.log(images);

  res.render('index', { 
    title: 'Express',
    images: images 
  });
});

module.exports = router;
