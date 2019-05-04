import 'idempotent-babel-polyfill';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import config from './config/config.js';
import swaggerJSON from './swagger';
// import User from './routes/user';

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

const swaggerDocument = {
  ...swaggerJSON,
  host:
      env === 'production'
        ? 'https://BukkaList-API.herokuapp.com/'
        : `localhost:${port}`,
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// User(app);
// set up a default catch-all route
app.get('*', (req, res) => {
  res.json({ message: 'Welcome to the BucketList-API' });
});

if (env !== 'test') {
  app.listen(port, () => {
    console.log(`Server starting on port: ${port}`);
  });
}


export default app;
