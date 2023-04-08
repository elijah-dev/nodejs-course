import { User } from "@model/user";
import { DataSourceService } from "@services/data-source-service";
import type { DataSource, Repository } from "typeorm";
import { ILike } from "typeorm";
import { validateOrReject } from "class-validator";
import { suggestQueryParamsSchema } from "./utils/suggest-query-params-schema";

export class UserService extends DataSourceService {
  private _repository: Repository<User>;

  async getAll() {
    return this._repository.find();
  }

  async getById(id: string) {
    return this._repository.findOneBy({
      id,
    });
  }

  async create(data: User) {
    const user = new User();
    user.login = data.login;
    user.password = data.password;
    user.age = data.age;
    await validateOrReject(user);

    const result = await this._repository.insert(user);

    return this._repository.findOneBy({
      id: result.identifiers[0]?.id as string,
    });
  }

  async update(id: string, data: User) {
    const user = new User();
    user.login = data.login;
    user.password = data.password;
    user.age = data.age;
    await validateOrReject(user);
    await this._repository.update({ id }, user);

    return this._repository.findOneBy({
      id,
    });
  }

  async delete(id: string) {
    await this._repository.softDelete(id);

    return this._repository.findOneBy({ id });
  }

  async suggest(params: unknown) {
    const { query, limit } = suggestQueryParamsSchema.parse(params);

    return this._repository.find({
      where: {
        login: ILike(`%${query}%`),
      },
      take: limit
    });
  }

  registerDataSource(dataSource: DataSource): void {
    this._dataSource = dataSource;
    this._repository = dataSource.getRepository(User);
  }
}
