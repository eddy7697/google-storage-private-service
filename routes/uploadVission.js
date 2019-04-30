var express = require('express');
var fs = require('fs');
var util = require('util');
var formidable = require('formidable');
var Storage = require('@google-cloud/storage');
var vision = require('@google-cloud/vision');
var client = new vision.ImageAnnotatorClient();
var router = express.Router();
var projectId = 'tonal-bank-198910';

var storage = new Storage({
  projectId: projectId
})

var bucketName = 'nearlinetest-mark';

router.post('/', function(req, res, next) {
  const form = new formidable.IncomingForm();
  const filePath = './uploads';

  form.uploadDir = filePath;
  // const filePath = './uploads';

  // fs.readdir(filePath, function (err, files) {
  //   console.log(files);
  // })
  
  // console.log()
  form.on('file', function(field, file) {
    //rename the incoming file to the file's name
    fs.rename(file.path, form.uploadDir + "/" + file.name);

    // storage
    //   .bucket(bucketName)
    //   .upload("./uploads/" + file.name, {
    //     gzip: true,
    //     metadata: {
    //       cacheControl: 'public, max-age=31536000',
    //     },
    //   })
    //   .then(() => {
    //   })
    //   .catch(err => {
    //     reject(err)
    //     console.error('ERROR:', err);
    //   });
    
  });

  client
    .labelDetection("/root/google-storage-private-service/uploads/" + file.name)
    .then(results => {
      const labels = results[0].labelAnnotations;

      res.send(labels);
      console.log(labels)
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // res.send('Success ok');

});

module.exports = router;
