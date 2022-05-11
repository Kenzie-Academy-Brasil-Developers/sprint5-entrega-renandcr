import { IUserStore, IUserUpdate } from "../../interfaces/users/index";
import { Users } from "../../entities/users.entity";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(Users);

export class UserCreate {
  async execute({ name, email, password, age }: IUserStore) {
    const users = await userRepository.find();
    const userMatches = users.find((user) => user.email === email);

    if (userMatches) {
      throw new Error("Email already exists");
    }

    const user = new Users();
    user.name = name;
    user.email = email;
    user.password = bcrypt.hashSync(password, 8);
    user.age = age;
    user.created_at = new Date();
    user.updated_at = new Date();

    await userRepository.save(user);

    return user;
  }
}

export class UserShowAll {
  async execute() {
    const users = await userRepository.find();
    return users;
  }
}

export class UserShow {
  async execute(id: string) {
    const users = await userRepository.find();

    const userMatches = users.find((user) => user.id === id);

    if (!userMatches) {
      throw new Error("User not found");
    }

    return userMatches;
  }
}

export class UserUpdate {
  async execute({ name, email, age, id }: IUserUpdate) {
    const users = await userRepository.find();

    const userMatches = users.find((user) => user.id === id);
    if (!userMatches) {
      throw new Error("User not found");
    }

    userMatches.name = name || userMatches.name;
    userMatches.email = email || userMatches.email;
    userMatches.age = age || userMatches.age;
    userMatches.updated_at = new Date();

    await userRepository.save(userMatches);

    return userMatches;
  }
}

export class UserDelete {
  async execute(id: string) {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    await userRepository.delete(user);

    return user;
  }
}
