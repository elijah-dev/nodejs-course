import dotenv from "dotenv";

export class KeyProvider {
  dbHost: string;
  dbPort: string;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
  port: string;
  jwtSecret: string;

  init() {
    dotenv.config();

    const {
      DB_HOST,
      DB_PORT,
      DB_USERNAME,
      DB_NAME,
      DB_PASSWORD,
      PORT,
      JWT_SECRET,
    } = process.env;

    if (
      DB_HOST &&
      DB_PORT &&
      DB_NAME &&
      DB_USERNAME &&
      DB_PASSWORD &&
      JWT_SECRET &&
      PORT
    ) {
      this.dbHost = DB_HOST;
      this.dbPort = DB_PORT;
      this.dbName = DB_NAME;
      this.dbUsername = DB_USERNAME;
      this.dbPassword = DB_PASSWORD;
      this.port = PORT;
      this.jwtSecret = JWT_SECRET;
    } else {
      throw new Error("Failed to load environment variables");
    }
  }

  getDbKeys() {
    return {
      host: this.dbHost,
      port: Number(this.dbPort),
      username: this.dbUsername,
      password: this.dbPassword,
      database: this.dbName,
    };
  }
}

export const keyProvider = new KeyProvider();
