import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SenderDto {
  @ApiProperty({
    name: 'email',
    required: true,
    type: String,
    description: 'Recipients email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
