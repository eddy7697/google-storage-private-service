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
    .getFiles()
    .then(results => {
      const files = results[0];

      console.log('Files:');
      files.forEach(file => {
        console.log(file.name);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  storage.getBuckets(function(err, buckets) {
    if (!err) {
      // buckets is an array of Bucket objects.
    }
  });
  
  //-
  // To control how many API requests are made and page through the results
  // manually, set `autoPaginate` to `false`.
  //-
  var callback = function(err, buckets, nextQuery, apiResponse) {
    if (nextQuery) {
      // More results exist.
      // console.log(buckets)
      storage.getBuckets(nextQuery, callback);
    }
  
    // The `metadata` property is populated for you with the metadata at the
    // time of fetching.
    buckets[0].metadata;
  
    // However, in cases where you are concerned the metadata could have
    // changed, use the `getMetadata` method.
    buckets[0].getMetadata(function(err, metadata, apiResponse) {});
  };
  
  storage.getBuckets({
    autoPaginate: false
  }, callback);
  
  //-
  // If the callback is omitted, we'll return a Promise.
  //-
  storage.getBuckets().then(function(data) {
    var buckets = data[0];

    // console.log(buckets)
  });

  res.render('index', { 
    title: 'Express',
    images: images 
  });
});

module.exports = router;
