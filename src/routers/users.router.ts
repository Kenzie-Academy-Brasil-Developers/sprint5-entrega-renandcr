import { Router } from "express";
import UserControllers from "../controllers/repositories/user.controllers";

const userRouter = Router();
const userControllers = new UserControllers();

userRouter.post("", userControllers.store);
userRouter.get("", userControllers.showAll);
userRouter.get("/:id", userControllers.show);
userRouter.patch("/:id", userControllers.update);
userRouter.delete("/:id", userControllers.delete);

export default userRouter;
