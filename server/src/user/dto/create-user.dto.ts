import { ApiProperty } from '@nestjs/swagger';
import { Length, Matches } from 'class-validator';
import { passwordRegex, usernameRegex } from './../../libs/regex';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username for the user',
    minLength: 6,
    maxLength: 32,
    example: 'john_doe',
  })
  @Length(6, 32)
  @Matches(usernameRegex, {
    message:
      'Username must contains at least 6 letter, no space, no special letters',
  })
  username: string;

  @ApiProperty({
    description: 'Password for the user',
    minLength: 6,
    maxLength: 32,
    example: 'MyPass123',
  })
  @Length(6, 32)
  @Matches(passwordRegex, {
    message: 'Password must contains at least 1 number and uppercase letter',
  })
  password: string;
}
