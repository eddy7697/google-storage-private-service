var compress_images = require('compress-images'), INPUT_path_to_your_images, OUTPUT_path;
 
INPUT_path_to_your_images = 'test.jpg';
OUTPUT_path = './uploads/';

compress_images(INPUT_path_to_your_images, OUTPUT_path, {compress_force: false, statistic: true, autoupdate: true}, false,
                                            {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
                                            {png: {engine: 'pngquant', command: ['--quality=20-50']}},
                                            {svg: {engine: 'svgo', command: '--multipass'}},
                                            {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(error, completed, statistic){
            console.log('-------------');
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log('-------------');                                   
});