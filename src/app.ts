import express from "express";
import userRouter from "./routers/users.router";

const app = express();
app.use(express.json());
app.use("/users", userRouter);

const port = 3333;

app.listen(port, () => {
  console.log("App running on port" + " " + port);
});
