const connection = require('../connection');

function createClient({name}){
    let query = `
        Insert Into Client(name)
        Values(?)
    `
    return connection.runQuery(query, [name]);
}

function getClients(){
    let query = `
        Select * From Client
        Where active = 1
    `
    return connection.runQuery(query);
}

function getClientByName(name) {
    let query = `
        Select * From Client
        Where name = ?
        And active = 1
    `
    return connection.runQueryRow(query, [name]);
}

module.exports = {
    getClients,
    createClient,
    getClientByName
}