var express = require('express');
var fs = require('fs');
var util = require('util');
var formidable = require('formidable');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  const form = new formidable.IncomingForm();
  const filePath = './public/uploads';

  form.uploadDir = filePath;
  // const filePath = './uploads';

  fs.readdir(filePath, function (err, files) {
    // console.log(files);
  })
  
  form.on('file', function(field, file) {
    //rename the incoming file to the file's name
    fs.rename(file.path, form.uploadDir + "/" + file.name);
  });

  form.parse(req, function(err, fields, files) {
    res.json(files)
    // res.redirect('/');
    // res.end(util.inspect({fields: fields, files: files}));
  });
});

module.exports = router;
