const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require("cors");

const loginRouter = require("./controller/LoginRouter");
const userRouter = require("./controller/UserRouter");


const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(loginRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
