const mysql = require('mysql2/promise');

const mysqlConnection = async ({ querys, values = [] }) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: 'root',
            password: "",
            database: "mernApp"
        })
        const [rows] = await connection.execute(querys, values);
        return rows;
    } catch (error) {
        console.error('Database query error:', error);
        return { error: error.message };
    }
    finally {
        if (connection) {
            await connection.end();  // Ensure connection is closed
        }
    }
}
module.exports = mysqlConnection;