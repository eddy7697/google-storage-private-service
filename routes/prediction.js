var express = require('express');
const automl = require('@google-cloud/automl');

var router = express.Router();

const projectId = 'tonal-bank-198910';
const location = 'us-central1'
const modelId = 'ICN4828686137575711807'

const bucketName = 'nearlinetest-mark';

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('test');
});

module.exports = router;
