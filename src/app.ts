import express, { Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import noCache from 'nocache';
import compression from 'compression';

import { errorMiddleware } from 'middlewares';
import { APP_CONSTANTS } from 'utils/constants';
import { logger } from 'utils/logger';
import routers from 'apis';
import configs from 'configs';
import initializeResources from 'resources';

import {login} from 'apis/v1/login/service';

const app = express();

app.use(cors());

function initializeSecurity() {
  app.use(noCache());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
}

function initializeMiddlewares() {
  app.use(express.json());
  app.use(
    compression({
      level: 6,
      threshold: 100 * 1024,
    })
  );

  // use for computing processing time on response
  app.use((request: any, _response: Response, next: NextFunction) => {
    request.startTime = Date.now();
    next();
  });
}

function initializeErrorHandler() {
  app.use(errorMiddleware);
}

initializeSecurity();
initializeMiddlewares();
app.use(APP_CONSTANTS.apiPrefix, routers);
initializeErrorHandler();

app.get('/login',(req, res) => {
  res.json({
    data : login
  })
})


export const listen = async () => {
  await initializeResources();
  app.listen(configs.port || 3000, () => {
    logger.info(`App listening on the port ${configs.port || 3000}`);
  });
};

export default app;
