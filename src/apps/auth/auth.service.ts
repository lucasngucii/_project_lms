import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AccountRepository } from 'src/repositories/account.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountRepository)
    private readonly accountRepository: AccountRepository,
  ) {}
  async register(body: any) {
    console.log('Registering account...', body.id);
    const account = await this.accountRepository.findAccountById(body.id);
    return account;
  }
}
