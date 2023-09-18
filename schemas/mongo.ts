// @ts-nocheckLogDB
/* eslint-disable no-unused-vars */

// Schemas
import { Schema, model, Model } from 'mongoose';
import { LogDBSchemas } from '../typings';

const LogDBSchema: Schema<LogDBSchemas> = new Schema(
  {
    id: String,
    ip: String,
    type: String,
    title: String,
    message: String,
    baseUrl: String,
    url: String,
    status: Number,
    date: { type: Date, default: new Date() },
  },
  { collection: 'LogDB' },
);

const LogDB: Model<LogDBSchemas> = model('LogDB', LogDBSchema, 'LogDB');

export default LogDB;
