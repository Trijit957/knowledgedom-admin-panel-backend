import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


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
    public userId: string;
    
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




