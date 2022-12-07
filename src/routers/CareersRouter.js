const express = require("express");
const CareersService = require("../services/CareersService");
const router = express.Router();
const { authorizeApi } = require('../middleware/authorizeMiddleware')



router.get("/api/v1/jobs", authorizeApi, async function (request, reply) {
  try {
    const res = await CareersService.get().getJobsList();
    reply.send(res)
   
  } catch (error) {
    console.log(error.message);
  }
});



module.exports = router;
