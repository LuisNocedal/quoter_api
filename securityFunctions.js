var md5 = require('md5');
const bcrypt = require('bcrypt');
const constants = require('./constants');

function createToken(dataString){
    return new Promise(async (resolve, reject) => {
        var token;
        let code = generateCode(10);
        let md5Token = md5(dataString + Date.now().toString() + code);
        //token = await bcryptHashFunc(md5Token);
        resolve(md5Token);
    });
}

function bcryptHashFunc(dataString){
    return new Promise(async (resolve, reject) => {
        bcrypt.hash(dataString, constants.SALT_ROUNDS, async function (err, hash) {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
}

function bcryptCompareFunc(data,encrypted){
    return new Promise(async (resolve, reject) => {
        bcrypt.compare(data, encrypted, async function (err, result) {
            if (err) {
                reject(err)
            }
            if(result)resolve(true)
            else resolve(false)
        })
    });
}


function generateCode(size){
    var min = 0;
    var max = constants.CODE_ALPHABET.length - 1;

    var code = '';

    for (let i = 0; i < size; i++) {
        code += constants.CODE_ALPHABET[Math.floor(Math.random() * (max - min + 1) + min)];
    }

    return code;
}

module.exports = {
    createToken,
    generateCode,
    bcryptHashFunc,
    bcryptCompareFunc
}