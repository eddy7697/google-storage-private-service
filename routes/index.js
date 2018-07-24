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
  const bucketName = 'nearlinetest-mark';
  const images = fs.readdirSync(filePath);

  console.log(images);

  storage
    .bucket(bucketName)
    .getFiles()
    .then(results => {
      const files = results[0];

      console.log('Files:');
      files.forEach(file => {
        console.log(file);
      });
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
