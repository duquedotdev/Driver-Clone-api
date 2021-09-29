import 'reflect-metadata';

import { createServer } from 'http';
import express from 'express';

import { routes } from './router';

import './database';

const app = express();
const server = createServer(app);

app.use(express.json());

routes(app);

export { server };
