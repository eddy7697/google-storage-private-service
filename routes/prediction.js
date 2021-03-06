const express = require('express')
const router = express.Router()
const fs = require('fs')
const { exec } = require('child_process')
const Buffer = require('buffer').Buffer
const compress = require('../common/compress-method.js')

// variable
const projectId = 'tonal-bank-198910'
const location = 'us-central1'
const modelId = 'ICN4828686137575711807'

// api intro
router.get('/:fileName', function(req, res, next) {
    let srcPath = './public/uploads/'
    let fileName = Buffer(req.params.fileName, 'base64').toString()
    let validFileName = fileName.replace(/[/\\?%*: |"<>]/g, '_')

    if (validFileName !== fileName && fs.existsSync(`${srcPath}${fileName}`)) {
        fs.renameSync(`${srcPath}${fileName}`, `${srcPath}${validFileName}`)
    }

    let filePath = `${srcPath}${validFileName}`    
    
    // compress image to speed up prediction
    compress.image(filePath, `${srcPath}compressed/`).then(response => {
        let bitmap = fs.readFileSync(`${srcPath}compressed/${validFileName}`)
        let imageBase64 = new Buffer(bitmap).toString('base64')
        let payloadFile = `${srcPath}payload/${validFileName}.json`

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
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router;
