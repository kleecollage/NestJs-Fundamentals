import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    name: 'id',
    type: Number,
    description: 'User identifier',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    name: 'name',
    type: String,
    description: 'User name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'email',
    type: String,
    description: 'User email',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'birthDate',
    type: Date,
    description: 'User birthDate',
    required: true,
  })
  // @IsDateString()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birthDate: Date;
}
