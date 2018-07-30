const express = require('express');
const Storage = require('@google-cloud/storage');
const fs = require('fs');
const router = express.Router();
const projectId = 'tonal-bank-198910';
const storage = new Storage({
  projectId: projectId
})

const bucketName = 'nearlinetest-mark';

/* GET home page. */
router.get('/', function(req, res, next) {
  const filePath = './uploads';  
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
  
  const uploadFilesToStorage = new Promise((resolve, reject) => {
    if (images.length > 0) {
      var fileName = filePath + '/' + images[0];

      storage
        .bucket(bucketName)
        .upload(fileName, {
          gzip: true,
          metadata: {
            cacheControl: 'public, max-age=31536000',
          },
        })
        .then(() => {
          fs.unlinkSync(fileName);
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
        })
        .catch(err => {
          reject(err)
          console.error('ERROR:', err);
        });
    } else {
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
    }
    
  })
  
  Promise.all([
    uploadFilesToStorage
  ]).then((results) => {
    console.log(results[0])
    res.render('index', { 
      title: 'Express',
      images: images ,
      storageFiles: results[0]
    });
  }, (err) => {
    console.log(err)
    res.render('index', { 
      title: 'Express',
      images: images ,
      storageFiles: []
    });
  });
  
});

function uploadFile(bucketName, filename) {
  const Storage = require('@google-cloud/storage');
  const storage = new Storage();
  
  storage
    .bucket(bucketName)
    .upload(filename, {
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    })
    .then(() => {
      console.log(`${filename} uploaded to ${bucketName}.`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END storage_upload_file]
}

module.exports = router;
