import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class AddAddressDto{

    @ApiProperty({example:[{full_address:'Ismailia , El5amsa ST',gov:'Egypt',city:'Ismailia' , flatNo:20,postalCode:41511}]})
    @IsArray()
    addresses: OneAddressDto[]
}
export class OneAddressDto{
    @ApiProperty({example:'Ismailia , El5amsa ST'})
    @IsString()
    @IsOptional()
    full_address: string;
    @ApiProperty({example:'Egypt'})
    @IsString()
    @IsOptional()
    gov: string;
    @ApiProperty({example:'Ismailia'})
    @IsString()
    @IsOptional()
    city: string;
    @ApiProperty({example:20})
    @IsNumber()
    @IsOptional()
    flatNo: number;
    @ApiProperty({example:41511})
    @IsNumber()
    @IsOptional()
    postalCode: number;
}