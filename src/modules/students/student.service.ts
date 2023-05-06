import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Student, StudentDocument } from "src/models/student/student.model";
import { StudentDTO, StudentOperationDTO } from "./student.dto";
import { StudentOperationResponseInterface, StudentResponseInterface, StudentResponseMessageEnum } from "./student.interface";

@Injectable()
export class StudentService {
    
    constructor(
        @InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>
    ) { }

    public async getStudents(requestQuery: { page: string; pageSize: string; }): Promise<StudentResponseInterface | HttpException> {
        try {
            const { page, pageSize } = requestQuery;
            if(
                isNaN(Number(page)) || 
                isNaN(Number(pageSize)) ||
                !page || !pageSize
            ) {
                const students = await this.studentModel.find();
                if(students?.length) {
                    return {
                        page: null,
                        pageSize: null,
                        totalPages: null,
                        students
                    };
                } else {
                    return {
                        page: null,
                        pageSize: null,
                        totalPages: null,
                        students: []
                    };
                }
            } else {
                const totalCount = await this.getStudentCount();
                const students = await this.studentModel
                                           .find()
                                           .limit(Number(pageSize))
                                           .skip((Number(page) - 1) * Number(pageSize));
                if(students?.length) {
                    return {
                        page: Number(page),
                        pageSize: Number(pageSize),
                        totalPages: Math.ceil(totalCount / Number(pageSize)),
                        students
                    }
                } else {
                    return {
                        page: Number(page),
                        pageSize: Number(pageSize),
                        totalPages: Math.ceil(totalCount / Number(pageSize)),
                        students: []
                    }
                }

            }
        } catch (error) {
            return new InternalServerErrorException(error);
        }
   
    }

    public async addStudent(newStudent: StudentDTO): Promise<StudentOperationResponseInterface | HttpException> {

       try {
           if(!newStudent || !Object.keys(newStudent).length) {
               throw new BadRequestException(StudentResponseMessageEnum.BAD_REQUEST);
           } else {
    
                const doesStudentExist = await this.getStudentExistance(newStudent);
                if (!doesStudentExist) {
                       
                       const _newStudent = new this.studentModel(newStudent);
                       const insertedStudent = await _newStudent.save();
                       
                       if(insertedStudent) {
         
                         return {
                               isStudentAdded: true,
                               message: StudentResponseMessageEnum.STUDENT_ADDED,
                               studentInfo: insertedStudent
                         }
                       }
                } else {
                    return {
                       isStudentAdded: false,
                       message: StudentResponseMessageEnum.STUDENT_EXISTS,
                       studentInfo: null
                    }
                }
           }
       } catch (error) {
           return new InternalServerErrorException(error);
       }
        
    }

    private async getStudentCount(): Promise<number> {
        const studentCount = await this.studentModel.countDocuments(); 
        return studentCount;
    }

    private async getFilteredStudentCount(filter: any): Promise<number> {
        const studentCount = await this.studentModel.countDocuments(filter); 
        return studentCount;
    }

    private async getStudentExistance(newStudent: StudentDTO): Promise<boolean> {
        const studentCount = await this.studentModel.countDocuments({ 
                phone: newStudent.phone,
                guardianPhone: newStudent.guardianPhone
         });
        return studentCount > 0;
    }

    public async addStudents(newStudents: Array<StudentDTO>): Promise<StudentOperationResponseInterface | HttpException> {
        try {
            if(!newStudents || !newStudents.length) {
                throw new BadRequestException(StudentResponseMessageEnum.BAD_REQUEST);
            } else {
                const insertedStudents = await this.studentModel.insertMany(newStudents);
                if(insertedStudents?.length) {
                    return {
                        isStudentAdded: true,
                        message: StudentResponseMessageEnum.STUDENT_ADDED,
                        studentsInfo: newStudents
                    } 
                } else {
                    return {
                        isStudentAdded: false,
                        message: StudentResponseMessageEnum.STUDENT_EXISTS,
                        studentInfo: null
                    }
                }
            }
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    public async getFilteredStudents(
        requestQuery: { 
            page: string;
            pageSize: string;
            name: string;
            gender: string;
            _class: string;
            school: string;
            board: string;
        }): Promise<StudentResponseInterface | HttpException>
    {
        try {
            const {
                page,
                pageSize,
                name,
                gender,
                _class,
                school,
                board,      
            } = requestQuery;
    
            if(
                isNaN(Number(page)) || 
                isNaN(Number(pageSize)) ||
                !page || !pageSize
            ) {
                let filter = {
                    ...(name && { name }),
                    ...(gender && { gender }),
                    ...(_class && { class: _class }),
                    ...(school && { school }),
                    ...(board && { board })
                };

                const students = await this.studentModel.find(filter);
    
                if(students?.length) {
                    return {
                        page: null,
                        pageSize: null,
                        totalPages: null,
                        students
                    };
                } else {
                    return {
                        page: null,
                        pageSize: null,
                        totalPages: null,
                        students: []
                    };
                }
            } else {

                let filter = {
                    ...(name && { name }),
                    ...(gender && { gender }),
                    ...(_class && { class: _class }),
                    ...(school && { school }),
                    ...(board && { board })
                };
    
                const totalCount = await this.getFilteredStudentCount(filter);
                const students = await this.studentModel
                                           .find(filter)
                                           .limit(Number(pageSize))
                                           .skip((Number(page) - 1) * Number(pageSize));
    
                if(students?.length) {
                    return {
                        page: Number(page),
                        pageSize: Number(pageSize),
                        totalPages: Math.ceil(totalCount / Number(pageSize)),
                        students
                    }
                } else {
                    return {
                        page: Number(page),
                        pageSize: Number(pageSize),
                        totalPages: Math.ceil(students.length / Number(pageSize)),
                        students: []
                    }
                }
    
            }
            
        } catch (error) {
            return new InternalServerErrorException(error);
        }

    }


    public async updateStudent(studentToBeUpdated: StudentOperationDTO): Promise<StudentOperationResponseInterface | HttpException> {
        try {
            const updatedStudent = await this.studentModel
                                             .findOneAndUpdate(
                                                 { _id: studentToBeUpdated._id },
                                                 studentToBeUpdated,
                                                 { new: true }
                                             );
            if(!updatedStudent || Object.keys(updatedStudent).length) {
                return {
                    isStudentUpdated: true,
                    message: StudentResponseMessageEnum.STUDENT_UPDATED,
                    studentInfo: updatedStudent
                }   
            } else {
                throw new NotFoundException('Student not found!'); 
            }
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    public async deleteStudent(studentToBeDeleted: StudentOperationDTO): Promise<StudentOperationResponseInterface | HttpException> {
        try {
            const deletedStudent = await this.studentModel.findOneAndDelete({ _id: studentToBeDeleted._id });
            if(!deletedStudent) {
                throw new NotFoundException('Student not found');
            }
            return {
                isStudentDeleted: true,
                message: StudentResponseMessageEnum.STUDENT_DELETED,
                studentInfo: deletedStudent
            }
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    public async deleteFilteredStudents(
        requestQuery: {
            name: string;
            gender: string;
            _class: string;
            school: string;
            board: string;
        }): Promise<StudentOperationResponseInterface | HttpException> 
    {
        try {
            const {
                name,
                gender,
                _class,
                school,
                board,      
            } = requestQuery;

            let filter = {
                ...(name && { name }),
                ...(gender && { gender }),
                ...(_class && { class: _class }),
                ...(school && { school }),
                ...(board && { board })
            };

            const deletedStudents = await this.studentModel.deleteMany(filter);
            if(!deletedStudents) {
                throw new NotFoundException('No Student Found!')
            }
            console.log(deletedStudents)
            return {
                isStudentDeleted: true,
                message: StudentResponseMessageEnum.STUDENT_DELETED,
            };
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }
    
}