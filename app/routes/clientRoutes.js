const router = require('express').Router()
const { json } = require('express/lib/response');
const db = require("../db");

// search all people
router.get('/', async (req, res) => {
    try {
        const conn = await db.connect();
        const [rows] = await conn.query('SELECT id, name, mail FROM client;');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

// search one person
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const conn = await db.connect();
        const sql = `SELECT id, name, mail FROM client WHERE id=?;`;
        const [rows] = await conn.query(sql, parseInt(id));
        const client = rows;

        // Check if the user already exists
        if (client.length === 0)
            return res.status(422).json({ message: "User not found!" });

        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

// insert person
router.post("/", async (req, res) => {
    const { name, mail, password } = req.body;
    console.log(password);

    try {
        const conn = await db.connect();
        const [rows] = await conn.query(`SELECT * FROM client WHERE mail="${mail}";`);
        const client = rows;

        // password conition
        if (password.length >= 20)
            return res.status(422).json({ message: "Very long password!" });
        // Check if the user already exists
        if (client.length > 0)
            return res.status(422).json({ message: "This user already exists!" });

        await conn.query(`INSERT INTO client(name, mail, password) values ("${name}", "${mail}", "${password}");`);
        return res.status(201).json({ message: "Person entered in the system!" });

    } catch (error) {
        res.status(500).json({ error: error });
    }
})

// update person
router.patch('/', async (req, res) => {
    const { name, mail, password } = req.body;

    try {
        const conn = await db.connect();
        const [rows] = await conn.query(`SELECT name, mail FROM client WHERE mail="${mail}";`);
        const client = rows;
        console.log(client);

        // Check if the user already exists
        if (client.length === 0)
            return res.status(422).json({ message: "User not found!" });

        await conn.query(`UPDATE client SET name="${name}", password="${password}" WHERE mail="${mail}";`);

        // Get user with new data
        const [changedRows] = await conn.query(`SELECT name, mail FROM client WHERE mail="${mail}";`);
        const changedClient = changedRows;
        console.log(changedClient);
        res.status(200).json(changedClient);

    } catch (error) {
        res.status(500).json({ error: error });
    }
})

// delete person
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const conn = await db.connect();
        const [rows] = await conn.query(`SELECT name, mail FROM client WHERE id=${id};`);
        const client = rows;
        console.log(client);

        // Check if the user already exists
        if (client.length === 0)
            return res.status(422).json({ message: "User not found!" });

        await conn.query(`DELETE FROM client WHERE id=${id};`);
        return res.status(201).json({ message: "Person deleted in the system!" });

    } catch (error) {
        res.status(500).json({ error: error });
    }


})

module.exports = router 