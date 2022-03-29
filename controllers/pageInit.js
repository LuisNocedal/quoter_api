const constants = require('../constants');
const securityModel = require('../models/securityModel');

const productModel = require('../models/productModel');
const companyModel = require('../models/companyModel');
const clientModel = require('../models/clientModel');
const quotesModel = require('../models/quoteModel');

async function products(req, res) {
    try {
        let dataToken = await securityModel.checkToken(req.params.token);
        if (!dataToken) {
            let data = {
                errorMessage: constants.INVALID_TOKEN_MESSAGE,
                session: false
            }
            res.send(data);
            return;
        }

        let products = await productModel.getProducts();

        let data = {
            session: true,
            products
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

async function createProduct(req, res) {
    try {
        let dataToken = await securityModel.checkToken(req.params.token);
        if (!dataToken) {
            let data = {
                errorMessage: constants.INVALID_TOKEN_MESSAGE,
                session: false
            }
            res.send(data);
            return;
        }

        let companies = await companyModel.getCompanies();

        let data = {
            session: true,
            companies
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

async function editProduct(req, res) {
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

        let idProduct = req.body.idProduct;

        let companies = await companyModel.getCompanies();
        let product = await  productModel.getProductById(idProduct);

        let data = {
            session: true,
            companies,
            product
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

async function createQuote(req, res) {
    try {
        let dataToken = await securityModel.checkToken(req.params.token);
        if (!dataToken) {
            let data = {
                errorMessage: constants.INVALID_TOKEN_MESSAGE,
                session: false
            }
            res.send(data);
            return;
        }

        let companies = await companyModel.getCompanies();
        let products = await productModel.getProducts();
        let clients = await clientModel.getClients();

        let data = {
            session: true,
            companies,
            products,
            clients
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

async function quotes(req, res) {
    try {
        let dataToken = await securityModel.checkToken(req.params.token);
        if (!dataToken) {
            let data = {
                errorMessage: constants.INVALID_TOKEN_MESSAGE,
                session: false
            }
            res.send(data);
            return;
        }

        let quotes = await quotesModel.getQuotes();

        let data = {
            session: true,
            quotes
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

async function quoteDetail(req, res) {
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

        let idQuote = req.body.idQuote;

        let quote = await quotesModel.getQuoteByIdQuote(idQuote);
        let quoteProducts = await quotesModel.getQuoteProductsByIdQuote(idQuote);

        let data = {
            session: true,
            quote,
            quoteProducts
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

async function editQuote(req, res) {
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

        let idQuote = req.body.idQuote;

        let clients = await clientModel.getClients();
        let companies = await companyModel.getCompanies();
        let products = await productModel.getProducts();
        let quote = await quotesModel.getQuoteByIdQuote(idQuote);
        let quoteProducts = await quotesModel.getQuoteProductsByIdQuote(idQuote);

        let data = {
            session: true,
            clients,
            companies,
            products,
            quote,
            quoteProducts
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
    products,
    createProduct,
    editProduct,
    createQuote,
    quotes,
    quoteDetail,
    editQuote
}