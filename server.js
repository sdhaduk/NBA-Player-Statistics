require("dotenv").config()

const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

let playerName = "";

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER, 
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise(); 


async function getStats() {
    const [rows] = await pool.query(`
    SELECT player, tm, pos, g, mp_per_game, fg_per_game, fga_per_game, fg_percent, x3p_percent,
    x2p_percent, ft_percent, orb_per_game, drb_per_game, trb_per_game, ast_per_game, blk_per_game, tov_per_game, pts_per_game 
    FROM player_data
    WHERE player = ?`, [playerName]);

    return rows
};

app.get("/", async (req, res) => {

    if (playerName == "") {
        res.render("body", {Name: "---", Team: "---", Pos: "---", 
        GP: "---", MIN: "---", FGPG: "---", FGAPG: "---", FGP: "---", 
        THREEPP: "---", TWOPP: "---", FTP: "---", ORBPG: "---", DRBPG: "---", 
        TRBPG: "---", APG: "---", STLPG: "---", BLKPG: "---", TOVPG: "---", 
        PTSPG: "---"});

    } else {
        const stats = await getStats();
        console.log(stats)
    }
        
});

app.post("/", (req, res) => {

    playerName = req.body.playerName;
    res.redirect("/")

});

const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
    console.log("Server started on port 3000");
}); 

