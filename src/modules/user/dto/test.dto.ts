import { IsNumber, IsPositive, IsString } from "class-validator";

export class TestDto {
    @IsString()
    name: string

    @IsNumber()
    @IsPositive()
    pin: number
}