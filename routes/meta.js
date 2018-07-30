var express = require('express');
var router = express.Router();

const Storage = require('@google-cloud/storage');

const projectId = 'tonal-bank-198910';

const bucketName = 'nearlinetest-mark';

const storage = new Storage({
  projectId: projectId
})

/* GET users listing. */
router.get('/', function(req, res, next) {

    storage
        .bucket(bucketName)
        .file(req.query.name)
        .getMetadata()
        .then(results => {
        const metadata = results[0];

        res.send(metadata);
        })
        .catch(err => {
        console.error('ERROR:', err);
        });
  res.send('respond with a resource');
});

module.exports = router;
