import { Body, Controller, Delete, Get, HttpException, Post, Put, Query } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentOperationResponseInterface, StudentResponseInterface } from "./student.interface";
import { StudentDTO, StudentOperationDTO } from "./student.dto";

@Controller('StudentApi') 
export class StudentController {

    constructor(
        private readonly studentService: StudentService
    ) {}

    @Get('GetStudents')
    public async handleGetStudent(@Query() requestQuery: { page: string; pageSize: string; }): Promise<StudentResponseInterface | HttpException> {           
        const response = await this.studentService.getStudents(requestQuery);
        return response;
    }

    @Get('GetFilteredStudents')
    public async getFilteredStudents(
        @Query() requestQuery: {
            page: string;
            pageSize: string;
            name: string;
            gender: string;
            _class: string;
            school: string;
            board: string;
        }
    ): Promise<StudentResponseInterface | HttpException> {
        const response = await this.studentService.getFilteredStudents(requestQuery);
        return response;
    }

    @Post('AddStudent')
    public async handleAddStudent(
        @Body() requestBody: StudentDTO
    ): Promise<StudentOperationResponseInterface | HttpException> {

        const response = await this.studentService.addStudent(requestBody);
        return response;
    }

    @Post('AddStudents')
    public async handleAddStudents(
        @Body() requestBody: Array<StudentDTO>
    ): Promise<StudentOperationResponseInterface | HttpException> {

        const response = await this.studentService.addStudents(requestBody);
        return response;
    }

    @Put('UpdateStudent')
    public async handleUpdateStudent(
        @Body() requestBody: StudentOperationDTO
    ): Promise<StudentOperationResponseInterface | HttpException> {

        const response = await this.studentService.updateStudent(requestBody);
        return response;
    }

    @Delete('DeleteStudent')
    public async handleDeleteStudent(
        @Body() requestBody: StudentOperationDTO
    ): Promise<StudentOperationResponseInterface | HttpException> {

        const response = await this.studentService.deleteStudent(requestBody);
        return response;
    }

    @Delete('DeleteFilteredStudents')
    public async handleDeleteFilteredStudents(
        @Query() requestQuery: {
            name: string;
            gender: string;
            _class: string;
            school: string;
            board: string;
        }
    ): Promise<StudentOperationResponseInterface | HttpException> {

        const response = await this.studentService.deleteFilteredStudents(requestQuery);
        return response;
    }





    // @Post('CreateCategory')
    // public async handleCreateCategory(
    //     @Body() requestBody: UserCategoryDTO
    // ): Promise<UserCategoryAddResponseInterface | HttpException> {

    //    const response = await this.userService.createCategory(requestBody);
    //    return response;
    // }

    // @Put('UpdateCategory')
    // public async handleUpdateCategory(
    //     @Body() requestBody: UserCategoryDTO
    // ): Promise<UserCategoryAddResponseInterface | HttpException> {
            
    //     const response = await this.userService.updateCategory(requestBody);
    //     return response;
    // }

    // @Delete('DeleteCategory')
    // public async handleDeleteCategory(
    //     @Body() requestBody: UserCategoryCodeDTO
    // ): Promise<UserCategoryAddResponseInterface | HttpException> {
                
    //     const response = await this.userService.deleteCategory(requestBody);
    //     return response;
    // }
}