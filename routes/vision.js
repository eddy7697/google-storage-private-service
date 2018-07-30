var express = require('express');
var router = express.Router();
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

var bucketName = 'nearlinetest-mark';


/* GET users listing. */
router.get('/', function(req, res, next) {
'use strict';

console.log(req);

client
  .labelDetection(`gs://${bucketName}/resources/city.jpg`)
  .then(results => {
    const labels = results[0].labelAnnotations;

    res.send(results);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
// [END vision_quickstart]
  
});

module.exports = router;
