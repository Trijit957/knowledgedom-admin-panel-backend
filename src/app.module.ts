import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from '@hapi/joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './modules/students/student.module';
//import { TransactionModule } from './modules/transaction/transaction.module';
//import { AuthModule } from './modules/auth/auth.module';
//import { UserModule } from './modules/user/user.module';
//import { UserTransactionModule } from './modules/user-transaction/user-transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
       DATABASE_HOST: Joi.string().required(),
       DATABASE_USER: Joi.string().required(),
       CLUSTER_NAME: Joi.string().required(),
       DATABASE_PASSWORD: Joi.string().required(),
      })
   }),
   MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const dbUserName = configService.get('DATABASE_USER');
      const dbPassword = configService.get('DATABASE_PASSWORD');
      const clusterName = configService.get('CLUSTER_NAME');
      const dbHost = configService.get('DATABASE_HOST');

      return {
        uri: `${dbHost}${dbUserName}:${dbPassword}@${clusterName}.hqy6vi0.mongodb.net/?retryWrites=true&w=majority`
      }
    },
    inject: [ConfigService]
  }),
   StudentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
