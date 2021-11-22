const express = require('express')
const { Client } = require("pg")

const app = express()
const api_port = 3000

const klient = new Client({
    user: "vvkctgka",
    host: "abul.db.elephantsql.com",
    database: "vvkctgka",
    password: "xEyPtF0m2OGUpwMYbiauDFzmKQPclMWV",
    port: 5432
});

const qry = `select f.mad_id, f.navn, f.kategori_id, f.co2_kg, mk.kategori
FROM final as f
JOIN mad_kategori as mk USING(kategori_id)
ORDER BY kategori_id, co2_kg DESC`

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