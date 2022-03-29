const constants = require('../constants');
const securityModel = require('../models/securityModel');
const fileManager = require('../fileManager');

const companyModel = require('../models/companyModel');

async function createCompany(req, res) {
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

        let companyData = req.body.companyData;
        let { name } = companyData;

        let company = await companyModel.getCompanyByName(name);

        if(company) {
            let data = {
                session: true,
                status: false,
                errorMessage: 'Ya existe esta empresa'
            }
            res.send(data);
            return
        }

        let { insertId: idCompany } = await companyModel.createCompany(companyData);

        let data = {
            session: true,
            status: true,
            idCompany,
            message: 'Empresa agregada'
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
    createCompany
}