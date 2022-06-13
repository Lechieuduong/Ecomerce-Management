import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @ApiProperty({ type: 'string' })
    name?: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    banner?: Express.Multer.File;

    @IsNumber()
    @Type(() => Number)
    @ApiProperty({ type: 'number' })
    position?: number;
}