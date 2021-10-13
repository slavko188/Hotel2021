import * as Validator from 'class-validator';

// U EDITOVANJU Administratora dozvoljavamo samo da promijenimo njegov password i nista vise.
export class EditAdministratorDto {
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(6, 128)
  password: string;
}