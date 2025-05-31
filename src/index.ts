import express from 'express';
import 'reflect-metadata';

import { AppDataSource } from './database/data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('Inserting a new user into the database...');
  })
  .catch((error: unknown) => {
    console.log(error);
  });

const app = express();
const port = process.env.PORT ?? '9001';

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log('Response sent');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
