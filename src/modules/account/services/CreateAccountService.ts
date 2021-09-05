import { DeepPartial, Equal, Repository } from 'typeorm';
import { Inject, Service } from 'typedi';
import * as Crypto from 'crypto';

import { HttpStatus, HttpStatusError } from '@shared/errors';

import { InjectRepository } from 'typeorm-typedi-extensions';
import Account from '@database/entities/Account';
import Role from '@database/entities/Role';

import SendMail from '@lib/email/NodeMailer';

import path from 'path';
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

    if (existsEmail)
      throw new HttpStatusError(HttpStatus.BAD_REQUEST, 'Este e-mail já esta sendo utilizado por outra pessoa.');

    const role = await this.roleRepository.findOne({
      where: { initials: Equal('USER') },
      select: ['id'],
    });

    const mewAccount: DeepPartial<Account> = {
      name,
      email,
      password: Crypto.createHash('sha1').update(password).digest('hex'),
      roles: [role],
    };

    const createAccount = await this.accountRepository.save(mewAccount);

    const registrationTemplate = path.resolve(__dirname, '..', 'views', 'registration_account.hbs');

    await this.emailService.sendMail({
      to: {
        name: createAccount.name,
        email,
      },
      subject: 'Bem-vindo ao Driver',
      templateData: {
        file: registrationTemplate,
        variables: {
          link: `${process.env.APP_WEB_URL}/confirm_account?token=`,
          company_name: 'Driver',
        },
      },
    });

    delete mewAccount.password;
    delete mewAccount.roles;

    return createAccount;
  }
}
