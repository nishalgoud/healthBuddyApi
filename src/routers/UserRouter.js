const express = require("express");
const router = express.Router();
const UserService =require('../services/UserService')
const { authorizeApi } = require('../middleware/authorizeMiddleware')

router.post("/api/v1/users", async function (request, reply) {
  try {
    const res = await UserService.get().createUser(request.body);
    reply.send(res)
   
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/api/v1/users", authorizeApi, async function (request, reply) {
  try {
    const res = await UserService.get().getUsersList();
    reply.send(res)
   
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/api/v1/users/{id}", authorizeApi , async function (request, reply) {
  try {
    // return [{test:'ajsdgfj'}]
    reply.send([{test:'ajsdgfj'}])
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
