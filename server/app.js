import express from "express";
import cors from "cors";
import adminRouter from "./routers/adminRouter.js"
import userRouter from "./routers/userRouter.js"
import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from "./dbConnection.js";
const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(port, function () {
  console.log("Server started successfully");
});