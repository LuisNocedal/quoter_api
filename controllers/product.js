const constants = require('../constants');
const securityModel = require('../models/securityModel');
const fileManager = require('../fileManager');

const productModel = require('../models/productModel');

async function createProduct(req, res) {
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

        let idUser = dataToken.idUser;
        let productData = req.body.productData;
        let image = req.body.image;
        let { name, idCompany } = productData;

        let product = await productModel.getProductByNameAndIdCompany(name, idCompany);

        if(product) {
            let data = {
                session: true,
                status: false,
                errorMessage: 'Ya existe un producto de esta empresa con ese nombre'
            }
            res.send(data);
            return;
        }

        if(image) {
            let filename = await fileManager.createImage(name + '' + Date.now().toString(), image);    
            productData.image = filename;
        }

        await productModel.createProduct(idUser, productData);

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

async function deleteProduct(req, res) {
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

        await productModel.deleteProduct(idProduct);

        let data = {
            session: true
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

async function saveProductChanges(req, res) {
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
        let productData = req.body.productData;
        let image = req.body.image;
        let { name } = productData;

        if(image) {
            let filename = await fileManager.createImage(name + '' + Date.now().toString(), image);
            productData.image = filename;

            await productModel.saveProductChangesWithImage(idProduct, productData)
        } else {
            await productModel.saveProductChanges(idProduct, productData);
        }

        let data = {
            session: true
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
    createProduct,
    deleteProduct,
    saveProductChanges
}