const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

async function createConnection() {
    const adapter = new FileAsync('db.json');
    db = await low(adapter);
    // asi se definen tablas task: [] .... user: []
    db.defaults({tasks: []}).write();
}

const getConnection = () => db;

module.exports = {
    createConnection,
    getConnection
}