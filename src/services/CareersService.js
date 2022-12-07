const Connection = require("../database/Connection");
class CareersService {

  async getJobsList() {
    try {
      let getConn = await Connection.get().getConnection();

      const res = await getConn.query(`exec get_jobs_list`);

      if (!res.recordsets[0][0].code) {
        return {
          code: res.recordsets[0][0].code,
          message: res.recordsets[1][0].message,
        };
      }
      return {
        code: res.recordsets[0][0].code,
        jobsList: res.recordsets[1],
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
CareersService.__instance = null;
CareersService.get = () => {
  if (!CareersService.__instance) {
    CareersService.__instance = new CareersService();
  }
  return CareersService.__instance;
};
module.exports = CareersService;
