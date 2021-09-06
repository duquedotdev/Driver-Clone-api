import 'reflect-metadata';

import { SERVER_PORT } from '@config/env';
import { started } from '@shared/utils';
import { server } from './app';

server.listen(SERVER_PORT, started);
