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

  const getFilesPromise = new Promise(function(resolve, reject) {
      storage
        .bucket(bucketName)
        .getFiles()
        .then(results => {
          const files = results[0];

          resolve(files)
        })
        .catch(err => {
          reject(err)
        });      
    });
  
  getFilesPromise.then(function(files) {
    res.render('index', { 
      title: 'Express',
      images: images ,
      storageFiles: files
    });
  }, function(reason) {
    res.render('index', { 
      title: 'Express',
      images: images ,
      storageFiles: []
    });
  })
  
});

module.exports = router;
