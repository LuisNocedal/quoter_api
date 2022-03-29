const constants = require('../constants');
const securityModel = require('../models/securityModel');
const fileManager = require('../fileManager');

const quoteModel = require('../models/quoteModel')

async function createQuote(req, res) {
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

        let quoteData = req.body.quoteData;
        let quoteProducts = req.body.quoteProducts;
        let idUser = dataToken.idUser;

        let { insertId: idQuote } = await quoteModel.createQuote(idUser, quoteData);

        for(product of quoteProducts) {
            await quoteModel.createQuoteProduct(idQuote,product);
        }

        let data = {
            session: true,
            status: true
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

async function saveQuoteChanges(req, res) {
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

        let quoteData = req.body.quoteData;
        let quoteProducts = req.body.quoteProducts;
        let idQuote = req.body.idQuote;
        
        await quoteModel.saveQuoteChanges(idQuote, quoteData);
        await quoteModel.deleteQuoteProduct(idQuote);

        for(product of quoteProducts) {
            await quoteModel.createQuoteProduct(idQuote, product);
        }
        
        let data = {
            session: true,
            status: true
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
    createQuote,
    saveQuoteChanges
}