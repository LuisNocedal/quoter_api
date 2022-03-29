const connection = require('../connection');

function createCompany({name}){
    let query = `
        Insert Into Company(name)
        Values(?)
    `
    return connection.runQuery(query, [name]);
}

function getCompanies(){
    let query = `
        Select * From Company
        Where active = 1
    `
    return connection.runQuery(query);
}

function getCompanyByName(name) {
    let query = `
        Select * From Company
        Where name = ?
        And active = 1
    `
    return connection.runQueryRow(query, [name]);
}

module.exports = {
    getCompanies,
    createCompany,
    getCompanyByName
}