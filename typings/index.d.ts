import { ConnectOptions } from "mongoose";

interface MySqlDBConnection {
  type: `Mysql`;
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  }
}
interface MongoDBConnection {
  type: `Mongo`,
  database: {
    url: string;
    options?: ConnectOptions;
  };
}

export interface LogDBSchemas {
  id: string;
  type: 'Error' | 'Info' | 'Debug' | 'Warn';
  ip: string;
  title: string;
  message: string;
  baseUrl?: string;
  url?: string;
  status?: number;
  date: Date;
}

export type DBType = 'Mongo' | 'Mysql'

export type DBData = MySqlDBConnection | MongoDBConnection;