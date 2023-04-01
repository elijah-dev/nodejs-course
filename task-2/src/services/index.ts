import { registerDataSourceServices } from "./register-data-source-services";
import { userService as user } from "./user";
import { groupService as group } from "./group";

export { registerDataSourceServices } from "./register-data-source-services";

export const registerDataSource = registerDataSourceServices(user, group);
export const userService = user;
export const groupService = group;
