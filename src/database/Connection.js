const sql = require("mssql");

class Connection {
  async getConnection() {
    try {
        const config = {
            user: 'ngBaddam01',
            password:'ngBaddam01',
            server: '141.215.69.65',
            database: 'ngBaddam01',
            options: {
                trustServerCertificate: true // true for local dev / self-signed certs
              }
          };
         const conn =  await sql.connect(config)
         return conn;

    } catch (error) {
      console.log(error);
    }
  }
}

//Enable singeton behaviour on this class
Connection.__instance = null;
Connection.get = () => {
  if (!Connection.__instance) {
    Connection.__instance = new Connection();
  }
  return Connection.__instance;
};
module.exports = Connection;