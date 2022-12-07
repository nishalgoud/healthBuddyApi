const Connection = require("../database/Connection");
class ContactService {
  async createContact(contactDetails) {
    try {
      const { name, email, mobileNumber, subject, specificDetails, inquiryId } =
        contactDetails;

      let getConn = await Connection.get().getConnection();

      const res = await getConn.query(
        `exec create_contact '${name}','${email}','${mobileNumber}','${subject}','${specificDetails}',${inquiryId}`
      );

      return {
        code: res.recordsets[0][0].code,
        message: res.recordsets[1][0].message,
      };
    } catch (error) {
      return {
        code: 0,
        message: error.message,
      };
    }
  }

  async getInquiryTypes() {
    try {
      let getConn = await Connection.get().getConnection();

      const res = await getConn.query(`exec get_inquiry_types`);

      if (!res.recordsets[0][0].code) {
        return {
          code: res.recordsets[0][0].code,
          message: res.recordsets[1][0].message,
        };
      }
      return {
        code: res.recordsets[0][0].code,
        inquiryTypes: res.recordsets[1],
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
ContactService.__instance = null;
ContactService.get = () => {
  if (!ContactService.__instance) {
    ContactService.__instance = new ContactService();
  }
  return ContactService.__instance;
};
module.exports = ContactService;
