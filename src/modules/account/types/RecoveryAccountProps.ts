import { IsEmail } from 'class-validator';

export default class RecoveryAccountProps {
  @IsEmail(
    { allow_ip_domain: false },
    {
      message: 'Informe um email valido.',
    },
  )
  email: string;
}
