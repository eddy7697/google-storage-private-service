var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  const form = new formidable.IncomingForm();
  const filePath = './uploads';

  fs.readdir(filePath, function (err, files) {
    console.log(files);
  })

  form.parse(req, function (err, fields, files) {
    console.log(files)
    res.write('File uploaded.');
    res.end();
  })
});

module.exports = router;
