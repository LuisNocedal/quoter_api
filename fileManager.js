var fs = require('fs');
var md5 = require('md5');

function createImage(nameStr, base64Image) {
    return new Promise((resolve, reject) => {
        let filename = md5(nameStr) + ".png";
        let buf = Buffer.from(base64Image, 'base64');
        fs.writeFile('./public/images/' + filename, buf, (err) => {
            if (err ) {
                reject(err);
            } else { 
                resolve(filename);
            }
        });
    });
}

module.exports = {
    createImage
}

