const Connection = require("../database/Connection");
class UserService {
  async createUser(userData) {
    try {
      const {
        email,
        password,
        firstName,
        mobileNumber,
        lastName,
        address,
        address2,
        city,
        state,
        country,
        zip,
      } = userData;

      let getConn = await Connection.get().getConnection();
      const sqlQuery = `exec create_user '${email}','${password}','${firstName}','${mobileNumber}'`;
      if (lastName) {
        sqlQuery += `,${lastName}`;
      }
      if (address) {
        sqlQuery += `,${address}`;
      }
      if (address2) {
        sqlQuery += `,${address2}`;
      }
      if (city) {
        sqlQuery += `,${city}`;
      }
      if (state) {
        sqlQuery += `,${state}`;
      }
      if (country) {
        sqlQuery += `,${country}`;
      }
      if (zip) {
        sqlQuery += `,${zip}`;
      }
      const res = await getConn.query(sqlQuery);

      if (!res.recordsets[0][0].code) {
        return {
          code: res.recordsets[0][0].code,
          message: res.recordsets[1][0].message,
        };
      }
      return {
        code: res.recordsets[0][0].code,
        user: res.recordsets[1][0],
      };
    } catch (error) {
      return {
        code: 0,
        message: error.message,
      };
    }
  }

  async getUsersList() {
    try {
      let getConn = await Connection.get().getConnection();

      const res = await getConn.query(`exec get_user_list`);

      if (!res.recordsets[0][0].code) {
        return {
          code: res.recordsets[0][0].code,
          message: res.recordsets[1][0].message,
        };
      }
      return {
        code: res.recordsets[0][0].code,
        usersList: res.recordsets[1],
      };
    } catch (error) {
      return {
        code: 0,
        message: error.message,
      };
    }
  }
}

//Enable singeton behaviour on this class
UserService.__instance = null;
UserService.get = () => {
  if (!UserService.__instance) {
    UserService.__instance = new UserService();
  }
  return UserService.__instance;
};
module.exports = UserService;
