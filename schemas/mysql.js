"use strict";
// @ts-nocheck
/* eslint-disable no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
// Schemas
const sequelize_1 = require("sequelize");
class LogDBSchema extends sequelize_1.Model {
}
LogDBSchema.init({
    id: sequelize_1.DataTypes.STRING,
    type: sequelize_1.DataTypes.STRING,
    title: sequelize_1.DataTypes.STRING,
    message: sequelize_1.DataTypes.STRING,
    date: sequelize_1.DataTypes.STRING,
}, {
    modelName: "LogDB",
    tableName: "LogDB",
});
exports.default = LogDBSchema;
