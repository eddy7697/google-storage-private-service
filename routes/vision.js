var express = require('express');
var router = express.Router();
var vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();
var bucketName = 'nearlinetest-mark';
var fileName = '000002.jpg';


/* GET users listing. */
router.get('/', function(req, res, next) {
  client
    .faceDetection(`gs://${bucketName}/${fileName}`)
    .then(result => {
        
        console.log('Detect success', result)
    })
    .catch(err => {
        console.log('Detect fail....', err)
    })
    
  res.send('respond with a resource');

  
});

module.exports = router;
