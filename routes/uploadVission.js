var express = require('express');
var fs = require('fs');
var util = require('util');
var formidable = require('formidable');
var Storage = require('@google-cloud/storage');
var router = express.Router();
var projectId = 'tonal-bank-198910';

const storage = new Storage({
  projectId: projectId
})

const bucketName = 'nearlinetest-mark';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  const form = new formidable.IncomingForm();
  const filePath = './uploads';

  form.uploadDir = filePath;
  // const filePath = './uploads';

  fs.readdir(filePath, function (err, files) {
    console.log(files);
  })
  
  form.on('file', function(field, file) {
    //rename the incoming file to the file's name
    fs.rename(file.path, form.uploadDir + "/" + file.name);

    storage
      .bucket(bucketName)
      .upload(form.uploadDir + "/" + file.name, {
        gzip: true,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
      })
      .then((res) => {
        // fs.unlinkSync(fileName);
        // storage
        //   .bucket(bucketName)
        //   .getFiles()
        //   .then(results => {
        //     const files = results[0];
  
        //     resolve(files)
        //   })
        //   .catch(err => {
        //     reject(err)
        //   }); 
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  });

});

module.exports = router;
