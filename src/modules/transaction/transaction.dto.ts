import { Type } from "class-transformer";
import { IsArray, IsDefined, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class CategoryDTO {

  @IsNumber()
  @IsDefined()
  public categoryCode: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()  
  public name: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public iconImageUrl: string;
}

export class TransactionDTO {

    @IsNumber()
    @IsDefined()
    public typeCode: number;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public typeName: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    public iconImageUrl: string;

    @ValidateNested({ each: true })
    @Type(() => CategoryDTO)
    @IsDefined()
    @IsArray()
    public categories: Array<CategoryDTO> | [];
}

