import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { UserTransaction, UserTransactionSchema } from "src/models/user-transaction/user-transaction.model";
import { UserTransactionController } from "./user-transaction.controller";
import { UserTransactionService } from "./user-transaction.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
              name: UserTransaction.name,
              schema: UserTransactionSchema
            }
          ])
    ],
    controllers: [UserTransactionController],
    providers: [UserTransactionService]
})
export class UserTransactionModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({
            path: '*', method: RequestMethod.ALL
        })
    }
}