const connection = require('../connection');
const constants = require('../constants');

function getUserByEmail(email){
    let query = `
        Select idUser, email From User
        Where email = ?
        And active = 1
    `
    return connection.runQueryRow(query,[email]);
}

function getPasswordByEmail(email){
    let query = `
        Select password From User
        Where email = ?
        And active = 1
    `
    return connection.runQueryRow(query,[email]);
}

function setUser({email}, passwordHash){
    let query = `
        INSERT INTO User(email, password) 
        VALUES (?,?)
    `
    return connection.runQuery(query,[email, passwordHash]);
}

module.exports = {
    getPasswordByEmail,
    getUserByEmail,
    setUser
}