async function connect() {
    if (global.connection && global.connection.stata !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(`mysql://root:1234@localhost:3306/nodejs`);
    console.log("Connected to MySQL!");
    global.connection = connection;
    return connection;
}

module.exports = { connect }

// EXAMPLES FOR SQL QUERY
//
// async function selectClients() {
//     const conn = await connect();
//     const [rows] = await conn.query('SELECT * FROM client;')
//     return rows;
// }

// async function insertClient(Client) {
//     const conn = await connect();
//     const sql = 'INSERT INTO client(name,mail,password) VALUES (?,?,?);';
//     const values = [Client.name, Client.mail, Client.password];
//     return await conn.query(sql, values);
// }

// async function updateClient(Client) {
//     const conn = await connect();
//     const sql = 'UPDATE client SET name=?, mail=? , password=? WHERE id=?';
//     const values = [Client.name, Client.mail, Client.password, Client.id];
//     return await conn.query(sql, values);
// }

// async function deleteClient(Client) {
//     const conn = await connect();
//     const sql = 'DELETE FROM client WHERE id=?';
//     const values = [Client.id];
//     return await conn.query(sql, values);
// }