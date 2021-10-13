import { DeepPartial, Equal, Repository } from 'typeorm';
import { Inject, Service } from 'typedi';

import { HttpStatus, HttpStatusError } from '@shared/errors';

import { InjectRepository } from 'typeorm-typedi-extensions';
import { Account, Role } from '@database/entities';

import SendMail from '@lib/email/NodeMailer';

import path from 'path';
import { COMPANY_NAME } from '@config/env';
import { EncryptPass } from '@shared/utils';
import CreateAccountProps from '../types/CreateAccountProps';

@Service()
export default class CreateAccountServices {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @Inject()
    private emailService: SendMail,
  ) {
    // eslint
  }

  async create({ name, email, password }: CreateAccountProps): Promise<Account> {
    const existsEmail = await this.accountRepository.findOne({ where: { email } });

    if (existsEmail) throw new HttpStatusError(HttpStatus.FORBIDDEN, 'Este e-mail já esta sendo utilizado.');

    const role = await this.roleRepository.findOne({
      where: { initials: Equal('USER') },
      select: ['id'],
    });

    const mewAccount: DeepPartial<Account> = {
      name,
      email,
      password: EncryptPass(password),
      roles: [role],
    };

    const createAccount = await this.accountRepository.save(mewAccount);

    const registrationTemplate = path.resolve(__dirname, '..', 'views', 'registration_account.hbs');

    this.emailService.sendMail({
      to: {
        name: createAccount.name,
        email,
      },
      subject: `Bem-vindo ao ${COMPANY_NAME}`,
      templateData: {
        file: registrationTemplate,
        variables: {
          company_name: COMPANY_NAME,
          link: `${process.env.APP_WEB_URL}/confirm_account?email=${email}`,
        },
      },
    });

    delete mewAccount.password;
    delete mewAccount.created_at;
    delete mewAccount.updated_at;
    delete mewAccount.roles;

    return createAccount;
  }
}
