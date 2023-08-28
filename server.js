const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

let playerName = "";

app.get("/", (req, res) => {

    if (playerName == "") {
        res.render("body", {Name: "---", Team: "---", Pos: "---", 
        GP: "---", MIN: "---", FGPG: "---", FGAPG: "---", FGP: "---", 
        THREEPP: "---", TWOPP: "---", FTP: "---", ORBPG: "---", DRBPG: "---", 
        TRBPG: "---", APG: "---", STLPG: "---", BLKPG: "---", TOVPG: "---", 
        PTSPG: "---"});

    } else {

        const db = new sqlite3.Database("./player_data.db", sqlite3.OPEN_READWRITE, (err) => {
            if (err) return console.error(err.message);
            console.log("connection successfull");
        });

        let sql = `
                SELECT 
                field4, field7, field5, field8, field10, field11, field12, field13, field14, field15, field17, field18, field19, field20, field21, field22, field23, field24, field26
                FROM player_data 
                WHERE field4 = ?`;

        db.all(sql, [playerName], (err, row) => {
        if (err) return console.error(err);
        
        playerStats = []

            row.forEach(row => {
                playerStats.push(row.field4);
                playerStats.push(row.field7);
                playerStats.push(row.field5);
                playerStats.push(row.field8);
                playerStats.push(row.field10);
                playerStats.push(row.field11);
                playerStats.push(row.field12);
                playerStats.push(row.field13);
                playerStats.push(row.field14);
                playerStats.push(row.field15);
                playerStats.push(row.field17);
                playerStats.push(row.field18);
                playerStats.push(row.field19);
                playerStats.push(row.field20);
                playerStats.push(row.field21);
                playerStats.push(row.field22);
                playerStats.push(row.field23);
                playerStats.push(row.field24);
                playerStats.push(row.field26);
            });

            res.render("body", {Name: playerStats[0], Team: playerStats[1], Pos: playerStats[2], 
                GP: playerStats[3], MIN: playerStats[4], FGPG: playerStats[5], FGAPG: playerStats[6], 
                FGP: playerStats[7], THREEPP: playerStats[8], TWOPP: playerStats[9], FTP: playerStats[10], 
                ORBPG: playerStats[11], DRBPG: playerStats[12], TRBPG: playerStats[13], APG: playerStats[14], 
                STLPG: playerStats[15], BLKPG: playerStats[16], TOVPG: playerStats[17], PTSPG: playerStats[18]});
        });
    }

});

app.post("/", (req, res) => {

    playerName = req.body.playerName;
    res.redirect("/")

});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

