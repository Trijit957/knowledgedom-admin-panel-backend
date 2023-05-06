import { Types } from "mongoose";
import { UserDocument } from "src/models/user/user.model";
import { CategoryInterface } from "../transaction/transaction.interface";

export interface StudentInterface {
    _id?: string;
    name: string;
    gender: string;
    class: string;
    school: string;
    board: string;
    phone: string;
    guardianName: string;
    guardianPhone: string;
}

export interface StudentResponseInterface {
    page: number;
    pageSize: number;
    totalPages: number;
    students: Array<StudentInterface>;
}

export interface StudentOperationResponseInterface {
    isStudentAdded?: boolean;
    isStudentUpdated?: boolean;
    isStudentDeleted?: boolean;
    message: string;
    studentInfo?: StudentInterface;
    studentsInfo?: Array<StudentInterface>;
}

export enum StudentResponseMessageEnum {
    STUDENT_ADDED = "Student added successfully!",
    STUDENT_UPDATED = "Student updated successfully!",
    STUDENT_DELETED = "Student deleted successfully!",
    STUDENT_EXISTS = "Student already exists!",
    ERROR = "Operation Failed!",
    BAD_REQUEST = "Student information not present in request body!"
}

