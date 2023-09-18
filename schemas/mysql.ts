// @ts-nocheck
/* eslint-disable no-unused-vars */

// Schemas
import { Model, DataTypes } from 'sequelize';
import { LogDBSchemas } from '../typings';

class LogDBSchema extends Model<LogDBSchemas> implements LogDBAttributes {
  public id: string;
  public type: string;
  public title: string;
  public message: string;
  public date: string;
}

LogDBSchema.init({
  id: DataTypes.STRING,
  type: DataTypes.STRING,
  title: DataTypes.STRING,
  message: DataTypes.STRING,
  date: DataTypes.STRING,
}, {
  modelName: "LogDB",
  tableName: "LogDB",
});

export default LogDBSchema;
