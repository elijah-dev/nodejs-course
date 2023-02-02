import type { User } from "./schema";

export const getUsersDictionary = (users: User[]) =>
  users.reduce<Record<string, User>>(
    (acc, item) => ({ ...acc, [item.id]: item }),
    {}
  );

export const getUsersLoginSet = (users: User[]) =>
  users.reduce<Set<string>>((acc, item) => {
    acc.add(item.login);

    return acc;
  }, new Set());

export const getUniqueLoginErrorMessage = (value: string) => ({
  message: `User with login ${value} already exists`,
});

export const sortUsersByLogin = (users: User[]) => {
  const clone = [...users];
  clone.sort((a, b) => {
    if (a.login < b.login) {
      return -1;
    }

    if (a.login > b.login) {
      return 1;
    }

    return 0;
  });

  return clone;
};
