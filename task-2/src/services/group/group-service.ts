import { Group } from "@model/group";
import { DataSourceService } from "@services/data-source-service";
import { validateOrReject } from "class-validator";
import type { DataSource, Repository } from "typeorm";

export class GroupService extends DataSourceService {
  private _repository: Repository<Group>;

  async getAll() {
    return this._repository.find();
  }

  async getById(id: string) {
    return this._repository.findOneBy({ id });
  }

  async create(data: Group) {
    const group = new Group();
    group.name = data.name;
    group.permissions = data.permissions;
    await validateOrReject(group);

    const result = await this._repository.insert(group);

    return this._repository.findOneBy({
      id: result.identifiers[0].id as string,
    });
  }

  async update(id: string, data: Group) {
    const group = new Group();
    group.name = data.name;
    group.permissions = data.permissions;
    await validateOrReject(group);
    await this._repository.update(id, group);

    return this._repository.findOneBy({ id });
  }

  async delete(id: string) {
    await this._repository.delete(id);

    return this._repository.findOneBy({ id });
  }

  registerDataSource(dataSource: DataSource): void {
    this._dataSource = dataSource;
    this._repository = dataSource.getRepository(Group);
  }
}
