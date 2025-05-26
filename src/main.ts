import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);

    //import constant from env
    const PORT = configService.get<string>('PORT');
    const allowedOrigin = configService.get<string>('ALLOWED_ORIGIN')?.split(',') ?? ["*"]

    //setup cors 
    setUpCors(app, allowedOrigin);

    //add validation pipe
    app.useGlobalPipes(new ValidationPipe({ transform: true }))

    //use cookie parser for parsing cookies
    app.use(cookieParser());

    //setting up global prefix on api
    app.setGlobalPrefix('api/v1');

    //starting server
    await app.listen(PORT ?? 3000);
    console.warn('Server is Running on PORT 4000')
  } catch (error) {
    console.error('Error => ', error);
  }
}

function setUpCors(app, allowedOrigins) {
  console.log('allowedOrigins', allowedOrigins)
  app.enableCors({
    origin: (origin, cb) => {
      if (allowedOrigins.includes(origin)) {
        cb(null, true)
      }
      else {
        console.error('BLOCKED BY CORS');
        throw new UnauthorizedException('Not allowed by CORS')
        cb(new Error('Not allowed by CORS'))
      }
    }
  })
}

bootstrap();
