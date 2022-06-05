import { Controller, Post } from "@nestjs/common";

@Controller() 
export class UserController {
    constructor() {}

    @Post('SignUp')
    public async handle() {}
}