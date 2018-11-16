const express = require('express');
const fs = require('fs');
const automl = require('@google-cloud/automl');

const router = express.Router();

const projectId = 'tonal-bank-198910';
const location = 'us-central1'
const modelId = 'ICN4828686137575711807'

const bucketName = 'nearlinetest-mark';



/* GET users listing. */
router.get('/', function(req, res, next) {
    var client = new automl.v1beta1.PredictionServiceClient();
    var formattedName = client.modelPath(projectId, location, modelId);
    var payload = fs.readFileSync('./public/uploads/request.json')
    var request = {
      name: formattedName,
      payload: payload,
    };

    client.predict(request)
    .then(responses => {
        var response = responses[0];
        res.send(response);
    })
    .catch(err => {
        res.send(err)
    });


    // let filePath = './public/uploads/335273.jpg'
    // let bitmap = fs.readFileSync(filePath);
    // let base64Encode
    
    // base64Encode = new Buffer(bitmap).toString('base64');

    // let payload = {
    //     "payload": {
    //         "image": {
    //             "imageBytes": base64Encode
    //         },
    //     }
    // }

    // fs.writeFileSync('./public/uploads/request.json', JSON.stringify(payload))

    // res.send(payload);
});

module.exports = router;
