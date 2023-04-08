import { registerDataSourceServices } from "./register-data-source-services";
import { userService as user } from "./user";
import { groupService as group } from "./group";
import { userGroupService as userGroup } from "./user-group";

export { registerDataSourceServices } from "./register-data-source-services";

export const registerDataSource = registerDataSourceServices(user, group, userGroup);
export const userService = user;
export const groupService = group;
export const userGroupService = userGroup;
