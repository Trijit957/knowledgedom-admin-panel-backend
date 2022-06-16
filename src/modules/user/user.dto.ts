import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDateString, IsDefined, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
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

