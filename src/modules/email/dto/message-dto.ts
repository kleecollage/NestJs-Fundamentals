import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { SenderDto } from 'src/modules/email/dto/sender-dto';

export class MessageDto {
  @ApiProperty({
    name: 'body',
    required: true,
    type: String,
    description: 'Message body to send',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    name: 'subject',
    required: true,
    type: String,
    description: 'Message subject to send',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    name: 'receivers',
    required: true,
    isArray: true,
    type: [String],
    description: 'Mail recipients',
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SenderDto)
  receivers: SenderDto[];
}
