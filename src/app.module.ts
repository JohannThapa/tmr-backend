import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { loggerOptions, SupabaseConfig } from './configs/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './configs';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CommonModule, ExceptionsFilter } from './modules/common';
import { SampleModule as DebugModule } from './modules/debug';
import { APP_FILTER, APP_PIPE, RouterModule } from '@nestjs/core';
import { BaseModule } from './modules/base';
import { UserModule } from './modules/users/users.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [
    LoggerModule.forRoot(loggerOptions),
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Database
    // TypeOrmModule.forRootAsync({
    //   useFactory: (config: ConfigService) => ({
    //     ...config.get<TypeOrmModuleOptions>('db'),
    //   }),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db'),
        logging: true, // Enable logging
        synchronize: true, // This is useful for dev, but be careful in production
      }),
      inject: [ConfigService],
    }),

    CommonModule, // Global
    BaseModule,
    DebugModule,
    // Module Router
    RouterModule.register([
      {
        path: 'user',
        module: UserModule,
      },
      {
        path: 'test',
        module: DebugModule,
      },
      {
        path: 'address',
        module: AddressModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Global Guard, Authentication check on all routers
    // { provide: APP_GUARD, useClass: AuthenticatedGuard },
    // Global Filter, Exception check
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // disableErrorMessages: true,
        transform: true,
        whitelist: true,
      }),
    },
    SupabaseConfig,
  ],
})
export class AppModule {}
