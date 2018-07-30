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

    console.log(req.query.name);

    storage
        .bucket(bucketName)
        .file(req.query.name)
        .getMetadata()
        .then(results => {
        const metadata = results[0];

        console.log(`File: ${metadata.name}`);
        console.log(`Bucket: ${metadata.bucket}`);
        console.log(`Storage class: ${metadata.storageClass}`);
        console.log(`Self link: ${metadata.selfLink}`);
        console.log(`ID: ${metadata.id}`);
        console.log(`Size: ${metadata.size}`);
        console.log(`Updated: ${metadata.updated}`);
        console.log(`Generation: ${metadata.generation}`);
        console.log(`Metageneration: ${metadata.metageneration}`);
        console.log(`Etag: ${metadata.etag}`);
        console.log(`Owner: ${metadata.owner}`);
        console.log(`Component count: ${metadata.component_count}`);
        console.log(`Crc32c: ${metadata.crc32c}`);
        console.log(`md5Hash: ${metadata.md5Hash}`);
        console.log(`Cache-control: ${metadata.cacheControl}`);
        console.log(`Content-type: ${metadata.contentType}`);
        console.log(`Content-disposition: ${metadata.contentDisposition}`);
        console.log(`Content-encoding: ${metadata.contentEncoding}`);
        console.log(`Content-language: ${metadata.contentLanguage}`);
        console.log(`Metadata: ${metadata.metadata}`);
        console.log(`Media link: ${metadata.mediaLink}`);
        })
        .catch(err => {
        console.error('ERROR:', err);
        });
  res.send('respond with a resource');
});

module.exports = router;
