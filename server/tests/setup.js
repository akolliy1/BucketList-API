import 'idempotent-babel-polyfill';

import request from 'supertest'; // eslint-disable-line
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import server from '../app';

dotenv.config();

mongoose.set('useCreateIndex', true);
mongoose.connect(
  process.env.DB_URL_TEST,
  { useNewUrlParser: true },
);

global.request = request;
global.server = server;
