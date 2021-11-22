import * as Validator from 'class-validator';

export class UserRefreshTokenDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsBase64() 
  token: string;
}