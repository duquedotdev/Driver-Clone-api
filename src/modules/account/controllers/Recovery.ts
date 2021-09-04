import { Body, JsonController, Post } from 'routing-controllers';
import { Inject, Service } from 'typedi';

import RecoveryPassword from '../services/RecoveryPassword';
import RecoveryAccountProps from '../types/RecoveryAccountProps';

@Service()
@JsonController('/account/recovery')
export default class Recovery {
  constructor(
    @Inject()
    private recoveryPassword: RecoveryPassword,
  ) {
    // eslint disable line
  }

  @Post()
  async recovery(@Body() email: RecoveryAccountProps): Promise<any> {
    return this.recoveryPassword.execute(email);
  }
}
