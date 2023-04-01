import { Group } from "@model/group";
import { User } from "@model/user";
import { UserGroup } from "@model/user-group";
import { DataSourceService } from "@services/data-source-service";
import type { Repository, DataSource } from "typeorm";
import { In } from "typeorm";
import { addUserToGroupSchema } from "./utils/add-user-to-group-schema";

export class UserGroupService extends DataSourceService {
  private _repository: Repository<UserGroup>;

  async addUserToGroup(data: unknown) {
    const { userIds, groupId } = addUserToGroupSchema.parse(data);

    const users = await this._dataSource
      .getRepository(User)
      .find({ where: { id: In(userIds) } });

    const group = await this._dataSource
      .getRepository(Group)
      .findOneByOrFail({ id: groupId });

    const userGroups = users.map((user) => {
      const userGroup = new UserGroup();
      userGroup.group = group;
      userGroup.user = user;

      return userGroup;
    });

    const { identifiers } = await this._repository.insert(userGroups);

    const userGroupIds = identifiers.map(
      (identifier) => identifier.id as string
    );

    return this._repository.find({ where: { id: In(userGroupIds) } });
  }

  registerDataSource(dataSource: DataSource): void {
    this._dataSource = dataSource;
    this._repository = dataSource.getRepository(UserGroup);
  }
}
