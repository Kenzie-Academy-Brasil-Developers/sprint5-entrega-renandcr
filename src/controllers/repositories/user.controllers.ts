import { Request, Response } from "express";
import {
  UserShow,
  UserDelete,
  UserShowAll,
  UserUpdate,
  UserCreate,
} from "../../services/repositories/user.services";

export default class UserControllers {
  async store(req: Request, res: Response) {
    try {
      const { name, email, password, age } = req.body;
      const userCreate = new UserCreate();
      const user = await userCreate.execute({ name, email, password, age });

      return res.status(201).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.name, message: err.message });
      }
    }
  }

  async showAll(req: Request, res: Response) {
    try {
      const userInstance = new UserShowAll();
      const users = await userInstance.execute();

      return res.status(200).json(users);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.name, message: err.message });
      }
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userInstance = new UserShow();
      const user = await userInstance.execute(id);

      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.name, message: err.message });
      }
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { name, email, age } = req.body;
      const { id } = req.params;
      const userInstance = new UserUpdate();
      const user = await userInstance.execute({
        name,
        email,
        age,
        id,
      });

      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.name, message: err.message });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userInstance = new UserDelete();
      const user = await userInstance.execute(id);

      return res
        .status(200)
        .json({ message: "User deleted successfully", user: user });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.name, message: err.message });
      }
    }
  }
}
