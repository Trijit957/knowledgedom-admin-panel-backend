import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { Student, StudentSchema } from "src/models/student/student.model";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
              name: Student.name,
              schema: StudentSchema
            }
          ])
    ],
    controllers: [StudentController],
    providers: [StudentService],
})
export class StudentModule { }
// export class UserModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//         consumer.apply(AuthMiddleware).forRoutes({
//             path: '*', method: RequestMethod.ALL
//         })
//     }
// }