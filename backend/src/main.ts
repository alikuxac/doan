import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { json, urlencoded } from 'express';
import compression from 'compression';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(compression());

  setupSwagger(app);

  const port = configService.get<number>('PORT') ?? 3000;

  await app.listen(port, () => {
    console.log('Server is running at port: ', port);
  });

  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});

// declare const module: any;
