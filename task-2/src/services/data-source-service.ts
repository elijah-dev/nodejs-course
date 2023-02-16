import type { DataSource } from "typeorm";

export abstract class DataSourceService {
  protected _dataSource: DataSource;

  abstract registerDataSource(dataSource: DataSource): void;
}
