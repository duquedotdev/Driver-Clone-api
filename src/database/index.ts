import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

useContainer(Container);
createConnection().catch((error) => {
  console.error(`Couldn't connect to the database!`);
  console.error(error);
});
