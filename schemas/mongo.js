"use strict";
// @ts-nocheckLogDB
/* eslint-disable no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
// Schemas
const mongoose_1 = require("mongoose");
const LogDBSchema = new mongoose_1.Schema({
    id: String,
    ip: String,
    type: String,
    title: String,
    message: String,
    baseUrl: String,
    url: String,
    status: Number,
    date: { type: Date, default: new Date() },
}, { collection: 'LogDB' });
const LogDB = (0, mongoose_1.model)('LogDB', LogDBSchema, 'LogDB');
exports.default = LogDB;
