import type { DataSource } from "typeorm";
import type { DataSourceService } from "./data-source-service";

export const registerDataSourceServices =
  (...services: DataSourceService[]) =>
  (dataSource: DataSource) => {
    services.forEach((service) => {
      service.registerDataSource(dataSource);
    });
  };
