import path from 'path';

import { Express } from 'express';
import { cors_config as origin } from '@config/cors';

import { RoutingControllersOptions, useExpressServer, useContainer } from 'routing-controllers';

import { AuthorizationChecker } from '@modules/session/middlewares/AuthorizationChecker';
import { CurrentAccountChecker } from '@modules/session/middlewares/CurrentAccountChecker';
import Container from 'typedi';

export const routes = (app: Express): void => {
  useContainer(Container);
  const options: RoutingControllersOptions = {
    defaultErrorHandler: false,
    validation: true,
    authorizationChecker: AuthorizationChecker,
    currentUserChecker: CurrentAccountChecker,
    // cors: true,
    cors: {
      origin,
    },
    routePrefix: '/api',
    // development: true,

    // defaults: {
    //   nullResultCode: 404,
    //   undefinedResultCode: 204,
    //   paramOptions: {
    //     required: true,
    //   },
    // },

    controllers: [path.join(__dirname, '..', '/modules/**/controllers/*{.ts,.js}')],
    middlewares: [path.join(__dirname, '..', '/modules/**/middlewares/*{.ts,.js}')],
    interceptors: [path.join(__dirname, '..', '/modules/**/interceptors/*{.ts,.js}')],
  };

  useExpressServer(app, options);
};
