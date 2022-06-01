const express = require('express')
const server = express();

server.use(
    express.urlencoded({
        extended: true,
    }),
)

server.use(express.json());
server.listen(3000);

server.get('/', (req, res) => {

    res.json({ message: "Route home is working!" });
})

// ROUTES
const clientRoutes = require('../app/routes/clientRoutes');
server.use('/client', clientRoutes);
