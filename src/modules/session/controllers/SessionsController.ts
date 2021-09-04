import { Post, JsonController, Body } from 'routing-controllers';

import { Inject, Service } from 'typedi';

import { AuthRequest } from '@modules/session/types/AuthRequest';
import { AuthResponse } from '@modules/session/types/AuthResponse';
import { AuthenticateAccountService } from '../services/AuthenticateAccountService';

@Service()
@JsonController('/session')
export default class SessionsController {
  @Inject()
  service!: AuthenticateAccountService;

  @Post()
  async authenticate(@Body() auth: AuthRequest): Promise<AuthResponse> {
    return this.service.authenticate(auth);
  }
}
