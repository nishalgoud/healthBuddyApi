const express = require("express");
const CareersService = require("../services/CareersService");
const router = express.Router();
const { authorizeApi } = require("../middleware/authorizeMiddleware");

router.get("/api/v1/jobs", authorizeApi, async function (request, reply) {
  try {
    const res = await CareersService.get().getJobsList();
    reply.send(res);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/api/v1/jobs/:id", authorizeApi, async function (request, reply) {
  try {
    const { id } = request.params;
    const res = await CareersService.get().getJobById(id);
    reply.send(res);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/api/v1/upload", authorizeApi, async function (request, reply) {
  try {
    console.log(request.user);
    const res = await CareersService.get().upload({files:request.files, user: request.user});
    reply.send(res);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
