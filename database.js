import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// const pool = mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER, 
//     database: process.env.DATABASE,
//     waitForConnections: true,
// })

const connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    database: "player_stats",
});

function getStats() {
    
    connection.execute("SELECT * FROM player_data", (err, results, fields) => {
        console.log(results)
    });
};


