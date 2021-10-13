import { Body, JsonController, Post } from 'routing-controllers';
import { Inject, Service } from 'typedi';

import { Account } from '@database/entities';

import CreateAccountServices from '../services/CreateAccountService';

import CreateAccountProps from '../types/CreateAccountProps';

@Service()
@JsonController('/account')
export default class Accounts {
  constructor(
    @Inject()
    private AccountService: CreateAccountServices,
  ) {
    // comment
  }

  @Post()
  async store(@Body() account: CreateAccountProps): Promise<Account> {
    return this.AccountService.create(account);
  }
}
