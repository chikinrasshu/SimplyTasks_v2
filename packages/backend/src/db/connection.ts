import mysql from "mysql2";
import { config } from "@simplytasks/common";

const connection = mysql.createConnection({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.pass,
    database: config.database.name
});

connection.connect((err) => {
    if (err) { 
        console.log(`Failed to connect to the ${config.database.name} database with error: `);
        console.log(err); 
        process.exit(1);
    }
    console.log(`Connected to the ${config.database.name} database.`);
});

export default connection;
