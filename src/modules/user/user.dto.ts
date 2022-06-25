import { Type } from "class-transformer";
import { IsArray, IsDefined, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { UserDocument } from "src/models/user/user.model";
import { CategoryDTO } from "../transaction/transaction.dto";

export class UserDTO {

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public email: string;
    
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public profilePictureUrl: string;

    @ValidateNested({ each: true })
    @Type(() => CategoryDTO)
    @IsDefined()
    @IsArray()
    public categories: Array<CategoryDTO> | [];
}

export class UserCategoryDTO extends CategoryDTO {

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public email: string;
}

export class UserEmailDTO {
    
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public email: string;
}

export class UserIdDTO {

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public userId: string | Types.ObjectId | UserDocument;
}

export class UserCategoryCodeDTO extends UserEmailDTO {
    
    @IsNumber()
    @IsDefined()
    @IsNotEmpty()
    public categoryCode: number;
}

