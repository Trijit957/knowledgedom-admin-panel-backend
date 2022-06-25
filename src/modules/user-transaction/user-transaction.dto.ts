import { Transform, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { UserDocument } from "src/models/user/user.model";


export class TransactionTypeCategoryDTO {
    @IsNumber()
    @IsDefined()
    @IsNotEmpty()
    public code: number;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public name: string;
}

export class IntervalInfoDTO {

    @IsOptional()
    month: number;

    @IsOptional()
    date: number;
}

export class UserTransactionDTO {

    @IsNumber()
    @IsDefined()
    public amount: number;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public userId: string | Types.ObjectId | UserDocument;
    
    @ValidateNested({ each: true })
    @Type(() => TransactionTypeCategoryDTO)
    categoryInfo: TransactionTypeCategoryDTO;

    @ValidateNested({ each: true })
    @Type(() => TransactionTypeCategoryDTO)
    typeInfo: TransactionTypeCategoryDTO;

    @IsOptional()
    public desription: string;

    @IsOptional()
    public isRepeat: boolean;

    @IsOptional()
    public frequency: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IntervalInfoDTO)
    public intervalInfo: IntervalInfoDTO;
}

export class UserTransactionByFilterDTO {

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public userId: string | Types.ObjectId | UserDocument;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    public categoryCode: number;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    public typeCode: number;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsDefined()
    public filterCode: number;
    

}





