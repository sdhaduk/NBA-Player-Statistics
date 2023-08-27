const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("body");
});

app.post("/", (req, res) => {
    const db = new sqlite3.Database("./player_data.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message);
        console.log("connection successfull");
    });

    const playerStats = [];

    const playerName = req.body.playerName;
    playerStats.push(playerName);
    let sql;

    sql = `SELECT field5 FROM player_data WHERE field4 = ?`;
    
    db.all(sql, [playerName], (err, rows) => {
        if (err) return console.error(err.message);
            rows.forEach(row => {
                console.log(row);
            });
    });

});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

