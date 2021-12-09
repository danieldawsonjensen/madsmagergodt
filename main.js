const express = require('express')
const { Client } = require("pg")

const app = express()
const api_port = 3000
const klient = new Client({
    user: "gfyahyvo",
    host: "hattie.db.elephantsql.com",
    database: "gfyahyvo",
    password: "O_FjKVEHwWbqCJn3Rg7BW8YxtGl-JCAq",
    port: 5432
});

const qry = `select * from final
order by kategori_id asc, co2_kg desc`

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

app.listen(api_port, () => {
    console.log(`Appl. lytter på http://localhost:${api_port}`)
})