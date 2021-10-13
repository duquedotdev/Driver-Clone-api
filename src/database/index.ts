import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

import ormConfig from '../../ormconfig.js';

// useContainer(Container);
createConnection();
