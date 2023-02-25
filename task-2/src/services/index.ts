import { registerDataSourceServices } from "./register-data-source-services";
import { userService as user } from "./user";

export { registerDataSourceServices } from "./register-data-source-services";

export const registerDataSource = registerDataSourceServices(user);
export const userService = user;
