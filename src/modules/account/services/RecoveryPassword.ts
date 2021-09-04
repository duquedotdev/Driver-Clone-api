import { Repository } from 'typeorm';
import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import path from 'path';

import { HttpStatus, HttpStatusError } from '@shared/errors';

import Account from '@database/entities/Account';
import EmailSender from '@lib/email/NodeMailer';

import RecoveryAccountProps from '../types/RecoveryAccountProps';

@Service()
export default class CreateAccountServices {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {
    // a
  }

  @Inject()
  private emailService: EmailSender;

  async execute({ email }: RecoveryAccountProps): Promise<void> {
    const existsEmail = await this.accountRepository.findOne({ where: { email } });

    if (!existsEmail)
      throw new HttpStatusError(
        HttpStatus.UNAUTHORIZED,
        'Não encontramos seu e-mail em nosso banco de dados tente novamente ou verifique seu email.',
      );

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    this.emailService.sendMail({
      to: {
        name: existsEmail.name,
        email,
      },
      subject: 'Recovery Password',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: existsEmail.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=`,
        },
      },
    });

    throw new HttpStatusError(HttpStatus.NO_CONTENT);
  }
}
