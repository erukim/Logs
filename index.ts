import { Sequelize } from 'sequelize'
import { DBData, DBType, LogDBSchemas } from './typings';
import EventEmitter from "events";
import mongoose from 'mongoose';
import LogDBMongo from './schemas/mongo'
// import LogDBMysql from './schemas/mysql'
const LogDBMysql: any = '';

export default class Logs extends EventEmitter {

  private database: any;

  public async Connection(data: DBData): Promise<string> {
    let database;
    if (data.type == `Mysql`) {
      database = new Sequelize(data.database.database, data.database.user, data.database.password, {
        dialect: "mysql",
        host: data.database.host,
        port: data.database.port,
        logging: false,
        define: {
          timestamps: true
        },
      }).sync().catch((e: any) => {
        throw new Error(`데이터 베이스 서버에 연결도중 에러가 발생하였습니다. : ${e.message}`)
      })
    } else if (data.type == `Mongo`) {
      mongoose.set('strictQuery', true);
      mongoose.connect(data.database.url, data.database.options);
      database = mongoose.connection;
    } else throw new Error(`[Logs] 데이터베이스 연결 정보가 옳바르지 않습니다.`)
    this.database = database;
    return `[Logs] 정상적으로 Log 데이터베이스가 연결되었습니다.`;
  }

  public async find(type: DBType, options?: LogDBSchemas) {
    this.databaseAvailable();
    if (type == `Mongo`) {
      const find = await LogDBMongo.find(options as any);
      return find
    } else if (type == `Mysql`) {
      const find = await LogDBMysql.findAll({ where: options as any })
      return find
    } else throw new Error(`[Logs] 검색 조건이 옳바르지 않습니다.`)
  }

  public async findOne(type: DBType, options?: LogDBSchemas) {
    this.databaseAvailable();
    if (type == `Mongo`) {
      const find = await LogDBMongo.findOne(options as any);
      return find
    } else if (type == `Mysql`) {
      const find = await LogDBMysql.findOne({ where: options as any })
      return find
    } else throw new Error(`[Logs] 검색 조건이 옳바르지 않습니다.`)
  }

  public async update(type: DBType, oldData: LogDBSchemas, newData: LogDBSchemas) {
    this.databaseAvailable();
    if (type == `Mongo`) {
      const find = await LogDBMongo.findOne(oldData);
      if (!find) return await '데이터가 조회되지 않았습니다.';
      const update = await LogDBMongo.findOneAndUpdate(oldData, newData);
      return update
    } else if (type == `Mysql`) {
      const find = await LogDBMysql.findOne({ where: oldData as any });
      if (!find) return await '데이터가 조회되지 않았습니다.';
      const update = await LogDBMysql.update(newData, { where: oldData as any })
      return update
    } else throw new Error(`[Logs] 검색 조건이 옳바르지 않습니다.`)
  }

  public async delete(type: DBType, options: LogDBSchemas) {
    this.databaseAvailable();
    if (type == `Mongo`) {
      const find = await LogDBMongo.findOneAndDelete(options);
      return find
    } else if (type == `Mysql`) {
      const find = await LogDBMysql.destroy({ where: options as any })
      return find
    } else throw new Error(`[Logs] 검색 조건이 옳바르지 않습니다.`)
  }

  public async create(type: DBType, options: LogDBSchemas) {
    this.databaseAvailable();
    if (type == `Mongo`) {
      const find = new LogDBMongo(options).save();
      return find
    } else if (type == `Mysql`) {
      throw '[Logs] 비활성화된 DB 타입입니다.'
      const find = await LogDBMysql.destroy({ where: options as any })
      return find
    } else throw new Error(`[Logs] 검색 조건이 옳바르지 않습니다.`)
  }

  private async databaseAvailable(database: string = this.database): Promise<boolean> {
    if (!database) throw new ReferenceError("[Logs] 데이터 베이스가 연결되지 않았습니다.");
    return true;
  }

}