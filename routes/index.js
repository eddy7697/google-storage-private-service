var express = require('express');
const Storage = require('@google-cloud/storage');
var fs = require('fs');
var router = express.Router();

const projectId = 'tonal-bank-198910';

const storage = new Storage({
  projectId: projectId
})

const bucketName = '123456789';

/* GET home page. */
router.get('/', function(req, res, next) {
  const filePath = './uploads';

  const images = fs.readdirSync(filePath);

  console.log(images);

  storage
    .bucket('nearlinetest-mark')
    .upload('/usr/local/google-storage-sample/uploads/000002.jpg', {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    })
    .then(() => {
      console.log(`${filename} uploaded to ${bucketName}.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  res.render('index', { 
    title: 'Express',
    images: images 
  });
});

module.exports = router;
