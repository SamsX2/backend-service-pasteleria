import "reflect-metadata";
import { DataSource } from "typeorm";
import { Pastel } from "./entities/pastel";


export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Pastel],
  migrations:[],
  subscribers:[]
});