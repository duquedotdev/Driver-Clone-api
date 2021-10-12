import { DeepPartial, Repository } from 'typeorm';
import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import path from 'path';

import { HttpStatus, HttpStatusError } from '@shared/errors';

import Account from '@database/entities/Account';
import Recovery from '@database/entities/Recovery';
import EmailSender from '@lib/email/NodeMailer';

import { GenCode } from '@shared/utils';
import RecoveryAccountProps from '../types/RecoveryAccountProps';

@Service()
export default class CreateAccountServices {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,

    @InjectRepository(Recovery)
    private recoveryRepository: Repository<Recovery>,

    @Inject()
    private emailService: EmailSender,
  ) {
    // a
  }

  // @Inject()
  // private emailService: EmailSender;

  async execute({ email }: RecoveryAccountProps, ip_address: string): Promise<void> {
    const ip = ip_address === '1' ? '127.0.0.1' : ip_address;
    const existsEmail = await this.accountRepository.findOne({ where: { email } });

    if (!existsEmail)
      throw new HttpStatusError(
        HttpStatus.UNAUTHORIZED,
        'Não encontramos seu e-mail em nosso banco de dados tente novamente ou verifique seu email.',
      );

    const date = new Date();

    const newObj: DeepPartial<Recovery> = {
      account_id: existsEmail.id,
      ip_address: ip,
      code: GenCode(0, 1000000),
      expires_in: date,
    };

    const Create = this.recoveryRepository.create(newObj);

    if (Create) {
      const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

      this.emailService
        .sendMail({
          to: {
            name: existsEmail.name,
            email,
          },
          subject: 'Recovery Password',
          templateData: {
            file: forgotPasswordTemplate,
            variables: {
              name: existsEmail.name,
              code: newObj.code,
              link: `${process.env.APP_WEB_URL}/reset-password?token=${newObj.code}`,
            },
          },
        })
        .then(() => this.recoveryRepository.save(newObj))
        .catch(() => {
          throw new HttpStatusError(HttpStatus.INTERNAL_SERVER_ERROR, 'Erro ao tentar enviar email');
        });
    } else {
      throw new HttpStatusError(HttpStatus.BAD_GATEWAY);
    }

    throw new HttpStatusError(HttpStatus.NO_CONTENT);
  }

  async validate(code: string, ip_address: string): Promise<Recovery> {
    const ip = ip_address === '1' ? '127.0.0.1' : ip_address;
    const date = new Date();
    const recovery = await this.recoveryRepository.findOne({
      where: { code, ip_address: ip },
      // select: ['code', 'ip_address', 'checked'],
    });

    if (!recovery) throw new HttpStatusError(HttpStatus.UNAUTHORIZED, 'codigo de verificação invalido.');

    const isSaved = await this.recoveryRepository.save({ ...recovery, checked: true, deleted_at: date });

    if (!isSaved) {
      throw new HttpStatusError(HttpStatus.FORBIDDEN);
    }
    delete isSaved.id;
    delete isSaved.expires_in;
    delete isSaved.created_at;
    delete isSaved.deleted_at;
    return isSaved;
  }
}
