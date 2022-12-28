import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
// import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import Joi from 'joi';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { HotelModule } from './modules/hotel/hotel.module';
// import { SharedModule } from './modules/shared/shared.module';
// import { FeedbackModule } from './modules/feedback/feedback.module';
// import { DiscountModule } from './modules/discount/discount.module';
// import { PaymentsModule } from './modules/payments/payments.module';
// import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        // App
        NODE_ENV: Joi.string().optional().default('development'),
        PORT: Joi.number().optional().default(3000),
        JWT_SECRET: Joi.string().required(),

        // Database
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),

        // Mailer
        // MAILER_HOST: Joi.string().required(),
        // MAILER_PORT: Joi.number().required(),
        // MAILER_USER: Joi.string().required(),
        // MAILER_PASS: Joi.string().required(),
        // MAILER_SECURE: Joi.boolean().required(),
      }),
    }),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          password: configService.get('REDIS_PASSWORD'),
          port: configService.get('REDIS_PORT'),
          username: configService.get('REDIS_USER'),
        },
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database:
          configService.get('NODE_ENV') === 'production'
            ? configService.get('POSTGRES_DB')
            : configService.get('POSTGRES_DB') + '_dev',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize:
          configService.get('NODE_ENV') === 'production' ? false : true,
      }),
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET'),
        secret: configService.get('JWT_SECRET'),
      }),
    }),

    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     defaults: {
    //       from: configService.get<string>('MAILER_FROM'),
    //     },
    //     transport: {
    //       host: configService.get<string>('MAILER_HOST'),
    //       port: configService.get<number>('MAILER_PORT'),
    //       secure: configService.get<boolean>('MAILER_SECURE'),
    //       auth: {
    //         user: configService.get<string>('MAILER_USER'),
    //         pass: configService.get<string>('MAILER_PASS'),
    //       },
    //     },
    //   }),
    // }),

    AuthModule,
    UserModule,
    // SharedModule,
    ReservationsModule,
    HotelModule,
    // FeedbackModule,
    // DiscountModule,
    // PaymentsModule,
    // ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
