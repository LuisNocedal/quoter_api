const connection = require('../connection');
const constans = require('../constants');

function getProducts(){
    let query = `
        Select p.*,
        concat('${constans.IMAGE_ROUTE}', p.image) as imageURL,
        c.name as company
        From Product p
        Inner Join Company c
        On c.idCompany = p.idCompany
        Where p.active = 1
    `
    return connection.runQuery(query);
}

function createProduct(idUser, { idCompany, name, description, price, stock, image }) {
    let query = `
       Insert Into Product(idUser, idCompany, name, description, price, stock, image)
       Values(?, ?, ?, ?, ?, ?, ?)
    `
    return connection.runQuery(query, [ idUser, idCompany, name, description, price, stock, image ]);
}

function deleteProduct(idProduct) {
    let query = `
       Update Product
       Set active = 0
       Where idProduct = ?
    `
    return connection.runQuery(query, [ idProduct ]);
}

function getProductById(idProduct) {
    let query = `
        Select *,
        concat('${constans.IMAGE_ROUTE}', image) as imageURL 
        From Product
        Where idProduct = ?
    `
    return connection.runQueryRow(query, [ idProduct ]);
}

function saveProductChanges(idProduct, { idCompany, name, description, price, stock }) {
    let query = `
        Update Product
        Set idCompany = ?,
        name = ?,
        description = ?,
        price = ?,
        stock = ?
        Where idProduct = ?
    `
    return connection.runQueryRow(query, [ idCompany, name, description, price, stock, idProduct ]);
}

function saveProductChangesWithImage(idProduct, { idCompany, name, description, price, stock, image }) {
    let query = `
        Update Product
        Set idCompany = ?,
        name = ?,
        description = ?,
        price = ?,
        stock = ?,
        image = ?
        Where idProduct = ?
    `
    return connection.runQueryRow(query, [ idCompany, name, description, price, stock, image, idProduct ]);
}

function getProductByNameAndIdCompany(name, idCompany) {
    let query = `
        Select * From Product
        Where name = ?
        And idCompany = ?
        And active = 1
    `
    return connection.runQueryRow(query, [name, idCompany]);
}

module.exports = {
    getProducts,
    createProduct,
    deleteProduct,
    getProductById,
    saveProductChanges,
    saveProductChangesWithImage,
    getProductByNameAndIdCompany
}