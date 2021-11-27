import * as Validator from 'class-validator';

export class LoginAdministratorDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Matches(/^[A-z][a-z0-9\.]{3,30}[A-z0-9]$/)
  username: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(6, 128)
  password: string;
}