const connection = require('../connection');
const constans = require('../constants');

function getQuoteByIdQuote(idQuote){
    let query = `
        Select
        q.idQuote,
        q.idCompany,
        q.idClient,
        c.name as company,
        cl.name as client,
        q.creation,
        u.name,
        u.lastname
        From Quote q
        Inner Join Company c
        On c.idCompany = q.idCompany
        Inner Join Client cl
        On cl.idClient = q.idClient
        Inner Join User u
        On u.idUser = q.idUser
        Where idQuote = ?
    `
    return connection.runQueryRow(query,[idQuote]);
}

function getQuoteProductsByIdQuote(idQuote){
    let query = `
        Select
        qp.price,
        qp.qty,
        p.idProduct,
        p.name,
        p.description,
        p.image,
        c.name as company,
        concat('${constans.IMAGE_ROUTE}', image) as imageURL
        From QuoteProduct qp
        Inner Join Product p
        On p.idProduct = qp.idProduct
        Inner Join Company c
        On c.idCompany = p.idCompany
        Where qp.idQuote = ?
    `
    return connection.runQuery(query,[idQuote]);
}

function getQuotes(){
    let query = `
        Select
        q.idQuote,
        c.name as company,
        cl.name as client,
        q.creation,
        u.name,
        u.lastname,
        (
            Select count(*) 
            From QuoteProduct sqp
            Where sqp.idQuote = q.idQuote
        ) productsQty,
        (
            Select sum(sqp.qty * sqp.price) 
            From QuoteProduct sqp
            Where sqp.idQuote = q.idQuote
        ) total
        From Quote q
        Inner Join Company c
        On c.idCompany = q.idCompany
        Inner Join Client cl
        On cl.idClient = q.idClient
        Inner Join User u
        On u.idUser = q.idUser
    `
    return connection.runQuery(query);
}

function createQuote(idUser, {idCompany, idClient}){
    let query = `
        Insert Into Quote(idUser, idCompany, idClient)
        Values(?, ?, ?)
    `
    return connection.runQuery(query, [idUser, idCompany, idClient]);
}

function createQuoteProduct(idQuote, {idProduct, qty, price}){
    let query = `
        Insert Into QuoteProduct(idQuote, idProduct, qty, price)
        Values(?, ?, ?, ?)
    `
    return connection.runQuery(query, [idQuote, idProduct, qty, price]);
}

function saveQuoteChanges(idQuote, {idCompany, idClient}){
    let query = `
        Update Quote
        Set idCompany = ?,
        idClient = ?
        Where idQuote = ?
    `
    return connection.runQuery(query, [idCompany, idClient, idQuote]);
}

function deleteQuoteProduct(idQuote){
    let query = `
        Delete From QuoteProduct
        Where idQuote = ?
    `
    return connection.runQuery(query, [idQuote]);
}

module.exports = {
    getQuotes,
    getQuoteByIdQuote,
    getQuoteProductsByIdQuote,
    createQuote,
    createQuoteProduct,
    saveQuoteChanges,
    deleteQuoteProduct
}