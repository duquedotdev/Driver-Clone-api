import { IsEmail, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';

const MIN_NAME = 1;
const MAX_NAME = 32;

export default class CreateAccountProps {
  @IsNotEmpty({ message: 'Informe um nome.' })
  @Length(MIN_NAME, MAX_NAME, {
    message: `O nome deve conter entre ${MIN_NAME} e ${MAX_NAME} caracteres.`,
  })
  @IsOptional()
  name: string;

  @IsEmail(
    { allow_ip_domain: false },
    {
      message: 'Informe um email valido.',
    },
  )
  email: string;

  @IsNotEmpty({ message: 'Informe uma senha.' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
    message:
      'No mínimo 8 caracteres, com no mínimo um número, um caractere especial, uma letra maiúscula e uma letra minúscula.',
  })
  password: string;
}
