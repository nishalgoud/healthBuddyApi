const jwt = require("jsonwebtoken");

const Connection = require("../database/Connection");
const { SECRET_KEY } = require("../constants");

class LoginService {
  async login(userData) {
    try {
      const { email, password } = userData;
      let getConn = await Connection.get().getConnection();

      let res = await getConn.query(
        `exec authenticate_user '${email}','${password}'`
      );
      if (!res.recordsets[0][0].code) {
        return {
          code: res.recordsets[0][0].code,
          message: res.recordsets[1][0].message,
        };
      }
      const user = res.recordsets[1][0];
      const roles = res.recordsets[2];
      const jwtToken = jwt.sign({ user, roles }, SECRET_KEY, {
        expiresIn: "1h",
      });
      return {
        code: res.recordsets[0][0].code,
        user,
        roles,
        jwtToken
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
LoginService.__instance = null;
LoginService.get = () => {
  if (!LoginService.__instance) {
    LoginService.__instance = new LoginService();
  }
  return LoginService.__instance;
};
module.exports = LoginService;
