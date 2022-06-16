import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { User, UserSchema } from "src/models/user/user.model";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
              name: User.name,
              schema: UserSchema
            }
          ])
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({
            path: '*', method: RequestMethod.ALL
        })
    }
}