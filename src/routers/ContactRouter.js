const express = require("express");
const router = express.Router();
const ContactService = require("../services/ContactService");

router.post("/api/v1/contact", async function (request, reply) {
  try {
    const res = await ContactService.get().createContact(request.body);
    reply.send(res)
   
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/api/v1/inquiryTypes",  async function (request, reply) {
  try {
    const res = await ContactService.get().getInquiryTypes();
    reply.send(res)
   
  } catch (error) {
    console.log(error.message);
  }
});



module.exports = router;
