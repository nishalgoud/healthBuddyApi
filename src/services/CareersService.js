const Connection = require("../database/Connection");
const fs = require("fs");
const path = require("path");
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
  async getJobById(id) {
    try {
      let getConn = await Connection.get().getConnection();

      const res = await getConn.query(`exec get_job_by_id ${id}`);

      if (!res.recordsets[0][0].code) {
        return {
          code: res.recordsets[0][0].code,
          message: res.recordsets[1][0].message,
        };
      }
      return {
        code: res.recordsets[0][0].code,
        jobData: res.recordsets[1][0],
      };
    } catch (error) {
      return {
        code: 0,
        message: error.message,
      };
    }
  }

  async upload({ files: { file }, user }) {
    try {
      const dir = path.join(path.resolve(), "upload");
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      const userFolderPath = dir + `/${user.userId}`;
      if (!fs.existsSync(userFolderPath)) {
        fs.mkdirSync(userFolderPath);
      }
      fs.writeFileSync(`${userFolderPath}/${file.name}`, file.data, "binary");
      return {
        code: 1,
        message: "file uploaded successfully ",
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
