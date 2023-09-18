"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const events_1 = __importDefault(require("events"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongo_1 = __importDefault(require("./schemas/mongo"));
// import LogDBMysql from './schemas/mysql'
const LogDBMysql = '';
class Logs extends events_1.default {
    Connection(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let database;
            if (data.type == `Mysql`) {
                database = new sequelize_1.Sequelize(data.database.database, data.database.user, data.database.password, {
                    dialect: "mysql",
                    host: data.database.host,
                    port: data.database.port,
                    logging: false,
                    define: {
                        timestamps: true
                    },
                }).sync().catch((e) => {
                    throw new Error(`데이터 베이스 서버에 연결도중 에러가 발생하였습니다. : ${e.message}`);
                });
            }
            else if (data.type == `Mongo`) {
                mongoose_1.default.set('strictQuery', true);
                mongoose_1.default.connect(data.database.url, data.database.options);
                database = mongoose_1.default.connection;
            }
            else
                throw new Error(`[Logs] 데이터베이스 연결 정보가 옳바르지 않습니다.`);
            this.database = database;
            return `[Logs] 정상적으로 Log 데이터베이스가 연결되었습니다.`;
        });
    }
    find(type, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.databaseAvailable();
            if (type == `Mongo`) {
                const find = yield mongo_1.default.find(options);
                return find;
            }
            else if (type == `Mysql`) {
                const find = yield LogDBMysql.findAll({ where: options });
                return find;
            }
            else
                throw new Error(`[Logs] 검색 조건이 옳바르지 않습니다.`);
        });
    }
    findOne(type, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.databaseAvailable();
            if (type == `Mongo`) {
                const find = yield mongo_1.default.findOne(options);
                return find;
            }
            else if (type == `Mysql`) {
                const find = yield LogDBMysql.findOne({ where: options });
                return find;
            }
            else
                throw new Error(`[Logs] 검색 조건이 옳바르지 않습니다.`);
        });
    }
    update(type, oldData, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.databaseAvailable();
            if (type == `Mongo`) {
                const find = yield mongo_1.default.findOne(oldData);
                if (!find)
                    return yield '데이터가 조회되지 않았습니다.';
                const update = yield mongo_1.default.findOneAndUpdate(oldData, newData);
                return update;
            }
            else if (type == `Mysql`) {
                const find = yield LogDBMysql.findOne({ where: oldData });
                if (!find)
                    return yield '데이터가 조회되지 않았습니다.';
                const update = yield LogDBMysql.update(newData, { where: oldData });
                return update;
            }
            else
                throw new Error(`[Logs] 검색 조건이 옳바르지 않습니다.`);
        });
    }
    delete(type, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.databaseAvailable();
            if (type == `Mongo`) {
                const find = yield mongo_1.default.findOneAndDelete(options);
                return find;
            }
            else if (type == `Mysql`) {
                const find = yield LogDBMysql.destroy({ where: options });
                return find;
            }
            else
                throw new Error(`[Logs] 검색 조건이 옳바르지 않습니다.`);
        });
    }
    create(type, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.databaseAvailable();
            if (type == `Mongo`) {
                const find = new mongo_1.default(options).save();
                return find;
            }
            else if (type == `Mysql`) {
                throw '[Logs] 비활성화된 DB 타입입니다.';
                const find = yield LogDBMysql.destroy({ where: options });
                return find;
            }
            else
                throw new Error(`[Logs] 검색 조건이 옳바르지 않습니다.`);
        });
    }
    databaseAvailable(database = this.database) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!database)
                throw new ReferenceError("[Logs] 데이터 베이스가 연결되지 않았습니다.");
            return true;
        });
    }
}
exports.default = Logs;
