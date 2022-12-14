const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const fileUpload = require('express-fileupload');

const loginRouter = require("./routers/LoginRouter");
const userRouter = require("./routers/UserRouter");
const contactRouter = require("./routers/ContactRouter");
const careersRouter = require("./routers/CareersRouter");


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
app.use(fileUpload());

app.use(loginRouter);
app.use(userRouter);
app.use(contactRouter)
app.use(careersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
