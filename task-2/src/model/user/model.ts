import { v4 as uuidv4 } from "uuid";
import {
  getUserSchema,
  getUserSchemaForCreation,
  getUserSchemaForUpdate,
  suggestQueryParamsSchema,
} from "./schema";
import type {
  User,
  UserSchema,
  CreateUserData,
  CreateUserSchema,
  UpdateUserData,
  UpdateUserSchema,
} from "./schema";
import z from "zod";
import { users } from "./data";
import {
  getUniqueLoginErrorMessage,
  getUsersDictionary,
  getUsersLoginSet,
  sortUsersByLogin,
} from "./utils";

class UserModel {
  private readonly _list: User[];
  private readonly _dict: Record<string, User>;
  private readonly _logins: Set<string>;

  constructor(data: User[]) {
    this._list = data;
    this._dict = getUsersDictionary(data);
    this._logins = getUsersLoginSet(data);
  }

  get users() {
    return this._list.filter((user) => !user.isDeleted);
  }

  getById(id: string) {
    const user = this._dict[id];

    if (!user || user.isDeleted) {
      throw new Error(`User with id ${id} wasn't found`);
    }

    return user;
  }

  create(data: unknown) {
    const createUserSchema = getUserSchemaForCreation({
      refineLogin: [this._validateLogin.bind(this), getUniqueLoginErrorMessage],
    });

    const createUserData = createUserSchema.parse(data);
    const id = uuidv4();
    const newUser: User = {
      ...createUserData,
      id,
      isDeleted: false,
    };

    this._list.push(newUser);
    this._dict[id] = newUser;
    this._logins.add(newUser.login);

    return newUser;
  }

  updateById(id: string, data: unknown) {
    const updateUserSchema = getUserSchemaForUpdate();
    const updateUserData = updateUserSchema.parse(data);
    const user = this._dict[id] as Record<string, string | number | boolean>;

    if (!user) {
      throw new Error(`User with id ${id} wasn't found`);
    }

    Object.entries(updateUserData).forEach(([key, value]) => {
      if (user[key]) {
        user[key] = value;
      }
    });

    return user;
  }

  suggest(params: unknown) {
    const { query, limit } = suggestQueryParamsSchema.parse(params);

    const results = this._list
      .filter(({ login, isDeleted }) => login.includes(query) && !isDeleted)
      .slice(0, limit);

    return sortUsersByLogin(results);
  }

  softDelete(id: string) {
    const user = this._dict[id] as Record<string, string | number | boolean>;

    if (!user) {
      throw new Error(`User with id ${id} wasn't found`);
    }

    user.isDeleted = true;

    return user;
  }

  private _validateLogin(login: string) {
    return !this._logins.has(login);
  }
}

export const userModel = new UserModel(users);
