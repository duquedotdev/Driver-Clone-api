import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import * as Crypto from 'crypto';

import Account from '@database/entities/Account';

import { TOKEN_EXPIRY, TOKEN_SECRET } from '@config/env';
import { HttpStatus, HttpStatusError } from '@shared/errors';
import { AuthRequest } from '../types/AuthRequest';
import { AuthResponse } from '../types/AuthResponse';

@Service()
export class AuthenticateAccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {
    // A
  }

  async authenticate({ email, password }: AuthRequest): Promise<AuthResponse> {
    const account = await this.accountRepository.findOne({
      where: { email },
      relations: ['roles'],
    });

    if (!account) {
      throw new HttpStatusError(HttpStatus.UNAUTHORIZED, 'Email ou senha incorretos.');
    }

    const passwordHashed = Crypto.createHash('sha1').update(password).digest('hex');

    if (account.password !== passwordHashed) {
      throw new HttpStatusError(HttpStatus.UNAUTHORIZED, 'Email ou senha incorretos.');
    }

    const roles = account.roles.map((role) => role.initials);

    const token = sign({ roles }, TOKEN_SECRET, {
      subject: account.id.toString(),
      expiresIn: TOKEN_EXPIRY,
    });

    return {
      account: {
        id: account.id,
        name: account.name,
        email: account.email,
        roles,
      },
      token,
    };
  }
}
