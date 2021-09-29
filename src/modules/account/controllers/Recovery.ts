import { Request, Response } from 'express';

import { Body, JsonController, Param, Params, Post, Req } from 'routing-controllers';
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
  async recovery(@Body() email: RecoveryAccountProps, @Req() request: Request): Promise<any> {
    const ip_address = request.ip.split(`:`).pop();
    return this.recoveryPassword.execute(email, ip_address);
  }

  @Post('/:code')
  async validate(@Req() request: Request, @Param('code') code: string): Promise<any> {
    const ip_address = request.ip.split(`:`).pop();
    return this.recoveryPassword.validate(code, ip_address);
  }
}
