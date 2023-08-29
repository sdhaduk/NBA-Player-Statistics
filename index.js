require("dotenv").config()

const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");
const PORT = process.env.PORT || 3000;


let playerName = "";

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER, 
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
}).promise()

async function getData() {

    console.log("Getting Query")

    const [rows] = await pool.query(`
    SELECT player, tm, pos, g, mp_per_game, fg_per_game, fga_per_game, fg_percent, x3p_percent,
    x2p_percent, ft_percent, orb_per_game, drb_per_game, trb_per_game, ast_per_game, blk_per_game, tov_per_game, pts_per_game, stl_per_game
    FROM player_data
    WHERE player = ?`, [playerName]);

    return rows[0]
};





app.get("/", async (req, res) => {

    if (playerName == "") {
        res.render("body", {Name: "---", Team: "---", Pos: "---", 
        GP: "---", MIN: "---", FGPG: "---", FGAPG: "---", FGP: "---", 
        THREEPP: "---", TWOPP: "---", FTP: "---", ORBPG: "---", DRBPG: "---", 
        TRBPG: "---", APG: "---", STLPG: "---", BLKPG: "---", TOVPG: "---", 
        PTSPG: "---"});

    } else {

        const stats = await getData();

        res.render("body", {Name: stats.player, Team: stats.tm, Pos: stats.pos, 
        GP: stats.g, MIN: stats.mp_per_game, FGPG: stats.fg_per_game, FGAPG: stats.fga_per_game, FGP: stats.fg_percent, 
        THREEPP: stats.x3p_percent, TWOPP: stats.x2p_percent, FTP: stats.ft_percent, ORBPG: stats.orb_per_game, DRBPG: stats.drb_per_game, 
        TRBPG: stats.trb_per_game, APG: stats.ast_per_game, STLPG: stats.stl_per_game, BLKPG: stats.blk_per_game, TOVPG: stats.tov_per_game, 
        PTSPG: stats.pts_per_game});
    }
});


app.post("/", (req, res) => {

    playerName = req.body.playerName;
    res.redirect("/")

});

app.listen(PORT, function() {
    console.log("Server started on port 3000");
}); 

