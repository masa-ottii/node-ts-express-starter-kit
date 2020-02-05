import  mysql from 'mysql2/promise'

const getConnection = async () => {
        // MySQLへの接続
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: 43306,
            database: 'todo_db'
        })
        return connection
    }

export default getConnection