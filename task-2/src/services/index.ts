import { registerDataSourceServices } from "./register-data-source-services";
import { userService as user } from "./user";
import { groupService as group } from "./group";
import { userGroupService as userGroup } from "./user-group";
import { registerServiceLogger } from "./register-service-logger";

export { registerDataSourceServices } from "./register-data-source-services";

export const registerDataSource = registerDataSourceServices(user, group, userGroup);
export const userService = registerServiceLogger(user);
export const groupService = registerServiceLogger(group);
export const userGroupService = registerServiceLogger(userGroup);
