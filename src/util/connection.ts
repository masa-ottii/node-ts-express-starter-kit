import mysql from 'mysql2/promise';

const getConnection = async () => {
  // MySQLへの接続
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306,
    database: 'workshop_db',
  });
  return connection;
};

export default getConnection;
