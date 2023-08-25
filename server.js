const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

const db = new sqlite3.Database("./new_stats.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);

    console.log("connection successfull");
});

app.get("/", (req, res) => {
    res.render("body");
});

app.post("/", (req, res) => {
    
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

