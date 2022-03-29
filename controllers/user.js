const constants = require('../constants');
const securityFunctions = require('../securityFunctions');
const securityModel = require('../models/securityModel');
const userModel = require('../models/userModel');
const { createImage } = require('../fileManager');

async function login(req, res) {
    try {
        let loginData = req.body.loginData;
        let { email, password } = loginData;

        let passwordData = await userModel.getPasswordByEmail(email);
        if (!passwordData) {
            let data = {
                errorMessage: 'Email incorrecto',
                status: false
            }
            res.send(data);
            return;
        }
        let passwordHash = passwordData.password;

        let correctPassword = await securityFunctions.bcryptCompareFunc(password, passwordHash);

        if (correctPassword) {
            let user = await userModel.getUserByEmail(email);

            let token;
            do {
                token = await securityFunctions.createToken(email);
            } while (await securityModel.checkToken(token));
            await securityModel.closeTokens(user.idUser);
            await securityModel.setToken(token, user.idUser);

            let data = {
                status: true,
                token: token,
                profile: user.profile
            }
            res.send(data);
        } else {
            let data = {
                errorMessage: 'Contraseña incorrecta',
                status: false
            }
            res.send(data);
        }

    } catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex
        }
        res.status(500).send(data);
    }
}

async function createUser(req, res) {
    try {
        let userData = req.body.userData;
        let { email, password } = userData;

        let user = await userModel.getUserByEmail(email);

        if (user) {
            let data = {
                errorMessage: 'El correo electrónico que quieres usar ya existe',
                status: false
            }
            res.send(data);
            return;
        }

        let passwordHash = await securityFunctions.bcryptHashFunc(password);

        let { insertId: idUser } = await userModel.setUser(userData, passwordHash);

        let token;
        do {
            token = await securityFunctions.createToken(email);
        } while (await securityModel.checkToken(token));
        await securityModel.closeTokens(idUser);
        await securityModel.setToken(token, idUser);

        let data = {
            status: true,
            message: 'Usuario creado',
            token
        }

        res.send(data);

    } catch (ex) {
        console.log(ex);
        let data = {
            errorMessage: constants.CATCH_MESSAGE,
            errorData: ex
        }
        res.status(500).send(data);
    }
}

module.exports = {
    login,
    createUser
}