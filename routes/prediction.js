const express = require('express');
const fs = require('fs');
const { exec } = require('child_process')
const automl = require('@google-cloud/automl');
const Buffer = require('buffer').Buffer;

const router = express.Router();

const projectId = 'tonal-bank-198910';
const location = 'us-central1'
const modelId = 'ICN4828686137575711807'

const bucketName = 'nearlinetest-mark';



/* GET users listing. */
router.get('/:fileName', function(req, res, next) {
    let srcPath = './public/uploads/'
    let fileName = Buffer(req.params.fileName, 'base64').toString()
    let payloadFile = `${srcPath}${fileName}.json`

    let filePath = `${srcPath}${fileName}`
    let bitmap = fs.readFileSync(filePath);
    let imageBase64 = new Buffer(bitmap).toString('base64');

    let payload = {
        "payload": {
            "image": {
                "imageBytes": imageBase64
            },
        }
    }

    fs.writeFileSync(payloadFile, JSON.stringify(payload))

    // res.send(payload);
    
    exec('pwd', (err, path, stderr) => {
        if (err) {
            return
        }

        res.send(`${path.substring(0, path.length-1)}${payloadFile.substr(1)}`)

        // res.send(fs.readFileSync(payloadFile));
        // exec(`curl -X POST -H "Content-Type: application/json" \
        //     -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
        //     https://automl.googleapis.com/v1beta1/projects/${projectId}/locations/${location}/models/${modelId}:predict -d @/root/google-storage-private-service/public/uploads/request.json`, (err, stdout, stderr) => {
        //     if (err) {
        //         return
        //     }

        //     res.send(stdout)
        // })  
    })
    // exec(`curl -X POST -H "Content-Type: application/json" \
    //     -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
    //     https://automl.googleapis.com/v1beta1/projects/${projectId}/locations/${location}/models/${modelId}:predict -d @/root/google-storage-private-service/public/uploads/request.json`, (err, stdout, stderr) => {
    //     if (err) {
    //         return
    //     }

    //     console.log(stdout)
    // })   
    // var client = new automl.v1beta1.PredictionServiceClient();
    // var formattedName = client.modelPath(projectId, location, modelId);
    // var payload = fs.readFileSync('./public/uploads/request.json')
    // var request = {
    //   name: formattedName,
    //   payload: payload,
    // };

    // client.predict(request)
    // .then(responses => {
    //     var response = responses[0];
    //     res.send(response);
    // })
    // .catch(err => {
    //     res.send(err)
    // });


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
