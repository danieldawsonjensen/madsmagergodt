const express = require('express')
const { Client } = require("pg")

const app = express()

const PORT = process.env.PORT || 5000;
const DB_USER = process.env.DB_USER || "my_user";
const DB_HOST = process.env.DB_HOST || "my_host";
const DB_NAME = process.env.DB_NAME || "database";
const DB_PW = process.env.DB_PW || "password";
const DB_PORT = process.env.DB_PORT || 5432;


const klient = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PW,
    port: DB_PORT
});

const qry = `select * from final
order by mad_id`

app.get('/final', async (req, res) => {
    try {
        let queryData = await klient.query(qry);
        res.json({
            "ok": true,
            "final": queryData.rows,
        })
    }
    catch (error) {
        res.json({
            "ok": false,
            "message": error.message,
        })
    }
})

klient.connect();

app.use(express.static("public"))

app.listen(PORT, () => {
    console.log(`Appl. lytter på http://localhost:${PORT}`)
})