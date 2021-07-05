import 'idempotent-babel-polyfill';
import express from 'express';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import config from './config/config.js';
import swaggerJSON from './swagger';
import User from './routes/user';
import BucketList from './routes/bucketList';
import bucketItem from './routes/bucketItem';

const app = express();

const { port, env, databaseUrl } = config;

if (env !== 'test') {
  mongoose.set('useCreateIndex', true);
  mongoose.connect(databaseUrl, { useNewUrlParser: true });
}

// Log requests to the console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const swaggerDocument = {
  ...swaggerJSON,
  host:
      env === 'production'
        ? 'https://bucketlist-ap.herokuapp.com/'
        : `localhost:${port}`,
};
// swaggerUi.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
User(app);
BucketList(app);
bucketItem(app);

app.get('/api/v1', (req, res) => res.json({ message: 'Welcome to the BucketList-API' }));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}


if (env !== 'test') {
  app.listen(port, () => {
    console.log(`Server starting on port: ${port}`);
  });
}


export default app;
