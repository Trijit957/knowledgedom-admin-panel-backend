import { Type } from "class-transformer";
import { IsArray, IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { UserDocument } from "src/models/user/user.model";
import { CategoryDTO } from "../transaction/transaction.dto";

export class StudentDTO {

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public gender: string;
    
    @IsString()
    @IsDefined()
    public class: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public school: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public board: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(10)
    public phone: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public guardianName: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(10)
    public guardianPhone: string;
}

export class StudentOperationDTO extends StudentDTO {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    public _id: string;
}


// @ValidateNested({ each: true })
// @Type(() => CategoryDTO)
// @IsDefined()
// @IsArray()
// public categories: Array<CategoryDTO> | [];

// export class UserCategoryDTO extends CategoryDTO {

//     @IsString()
//     @IsDefined()
//     @IsNotEmpty()
//     public email: string;
// }

// export class UserEmailDTO {
    
//     @IsString()
//     @IsDefined()
//     @IsNotEmpty()
//     public email: string;
// }

// export class UserIdDTO {

//     @IsString()
//     @IsDefined()
//     @IsNotEmpty()
//     public userId: string | Types.ObjectId | UserDocument;
// }

// export class UserCategoryCodeDTO extends UserEmailDTO {
    
//     @IsNumber()
//     @IsDefined()
//     @IsNotEmpty()
//     public categoryCode: number;
// }

