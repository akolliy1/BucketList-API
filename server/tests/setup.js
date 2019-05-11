import 'idempotent-babel-polyfill';

import request from 'supertest';// eslint-disable-line
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import server from '../app';
import User from '../models/User';
import bucketList from '../models/BucketList';
import BucketItem from '../models/BucketItem';
import createToken from '../helpers/createToken';

dotenv.config();

const signinPassword = 'password1';
const signinHash = bcrypt.hashSync(signinPassword, 10);

mongoose.set('useCreateIndex', true);
mongoose.connect(
  process.env.DB_URL_TEST,
  { useNewUrlParser: true },
);

global.request = request;
global.server = server;
global.userModel = User;
global.bucketListModel = bucketList;
global.bucketItemModel = BucketItem;
global.generateToken = createToken;
global.signinHash = signinHash;
// slug used in user controller test
