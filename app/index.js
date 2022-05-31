
(async () => {
    const db = require("./db");
    console.log("começou!");
    await db.deleteClient({ id: 6 });
    await db.updateClient({ nome: "TesteNovo", email: "teste@dominio", senha: "1234", id: 4 });
    await db.insertClient({ nome: "Teste", email: "teste@dominio", senha: "1234" });
    const clientes = await db.selectClients();
    console.log(clientes);
})();
