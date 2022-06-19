import { Body, Controller, Delete, Get, HttpException, Post, Put } from "@nestjs/common";
import { CategoryInterface } from "../transaction/transaction.interface";
import { UserCategoryCodeDTO, UserCategoryDTO, UserEmailDTO } from "./user.dto";
import { UserCategoryAddResponseInterface } from "./user.interface";
import { UserService } from "./user.service";

@Controller('UserApi/UserCategoryApi') 
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Get('GetCategories')
    public async handleGetCategory(
        @Body() requestBody: UserEmailDTO
    ): Promise<Array<CategoryInterface> | HttpException> {
                
        const response = await this.userService.getCategory(requestBody.email);
        return response;
    }
    
    @Post('CreateCategory')
    public async handleCreateCategory(
        @Body() requestBody: UserCategoryDTO
    ): Promise<UserCategoryAddResponseInterface | HttpException> {

       const response = await this.userService.createCategory(requestBody);
       return response;
    }

    @Put('UpdateCategory')
    public async handleUpdateCategory(
        @Body() requestBody: UserCategoryDTO
    ): Promise<UserCategoryAddResponseInterface | HttpException> {
            
        const response = await this.userService.updateCategory(requestBody);
        return response;
    }

    @Delete('DeleteCategory')
    public async handleDeleteCategory(
        @Body() requestBody: UserCategoryCodeDTO
    ): Promise<UserCategoryAddResponseInterface | HttpException> {
                
        const response = await this.userService.deleteCategory(requestBody);
        return response;
    }
}