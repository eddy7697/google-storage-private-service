const express = require('express')
var compress_images = require('compress-images')
const router = express.Router()
const fs = require('fs')
const { exec } = require('child_process')
const automl = require('@google-cloud/automl')
const Buffer = require('buffer').Buffer

// variable
const projectId = 'tonal-bank-198910'
const location = 'us-central1'
const modelId = 'ICN4828686137575711807'

// api intro
router.get('/:fileName', function(req, res, next) {
    let srcPath = './public/uploads/'
    let fileName = Buffer(req.params.fileName, 'base64').toString()
    let payloadFile = `${srcPath}${fileName}.json`

    let filePath = `${srcPath}${fileName}`


    // let bitmap = fs.readFileSync(filePath);
    // let imageBase64 = new Buffer(bitmap).toString('base64');

    compress_images(filePath, srcPath, {compress_force: false, statistic: true, autoupdate: true}, false,
        {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
        {png: {engine: 'pngquant', command: ['--quality=20-50']}},
        {svg: {engine: 'svgo', command: '--multipass'}},
        {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(error, completed, statistic){
        
            
        let bitmap = fs.readFileSync(filePath);
        let imageBase64 = new Buffer(bitmap).toString('base64');

        // generate payload
        let payload = {
            "payload": {
                "image": {
                    "imageBytes": imageBase64
                },
            }
        }

        fs.writeFileSync(payloadFile, JSON.stringify(payload))
        
        // image prediction
        exec('pwd', (err, path, stderr) => {
            if (err) {
                return
            }

            exec(`curl -X POST -H "Content-Type: application/json" \
                -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
                https://automl.googleapis.com/v1beta1/projects/${projectId}/locations/${location}/models/${modelId}:predict -d @${path.substring(0, path.length-1)}${payloadFile.substr(1)}`, (error, stdout, stderr) => {
                if (error) {
                    return
                }

                res.send(stdout)
            })  
        })


    });

    
})

module.exports = router;
