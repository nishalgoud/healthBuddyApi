const express = require("express");
const router = express.Router();
const LoginService =require('../services/LoginService')


router.post("/api/v1/login", async function (request, reply) {
  try {
    const res = await LoginService.get().login(request.body);
    reply.send(res);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
