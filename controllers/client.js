const constants = require('../constants');
const securityModel = require('../models/securityModel');
const fileManager = require('../fileManager');

const clientModel = require('../models/clientModel');

async function createClient(req, res) {
    try {
        let dataToken = await securityModel.checkToken(req.body.token);
        if (!dataToken) {
            let data = {
                errorMessage: constants.INVALID_TOKEN_MESSAGE,
                session: false
            }
            res.send(data);
            return;
        }

        let clientData = req.body.clientData;
        let { name } = clientData;

        let client = await clientModel.getClientByName(name);

        if(client) {
            let data = {
                session: true,
                status: false,
                errorMessage: 'Ya existe este cliente'
            }
            res.send(data);
            return
        }

        let { insertId: idClient } = await clientModel.createClient(clientData);

        let data = {
            session: true,
            status: true,
            idClient,
            message: 'Cliente agregado'
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
    createClient
}