async function connect() {
    if (global.connection && global.connection.stata !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(`mysql://root:1234@localhost:3306/nodejs`);
    console.log("Conectado no MySQL!");
    global.connection = connection;
    return connection;
}

async function selectClients() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM cliente;')
    return rows;
}

async function insertClient(Client) {
    const conn = await connect();
    const sql = 'INSERT INTO cliente(nome,email,senha) VALUES (?,?,?);';
    const values = [Client.nome, Client.email, Client.senha];
    return await conn.query(sql, values);
}

async function updateClient(Client) {
    const conn = await connect();
    const sql = 'UPDATE cliente SET nome=?, email=? , senha=? WHERE id=?';
    const values = [Client.nome, Client.email, Client.senha, Client.id];
    return await conn.query(sql, values);
}

async function deleteClient(Client) {
    const conn = await connect();
    const sql = 'DELETE FROM cliente WHERE id=?';
    const values = [Client.id];
    return await conn.query(sql, values);
}

module.exports = { selectClients, insertClient, updateClient, deleteClient }