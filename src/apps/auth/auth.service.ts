import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities';
import { BaseRepository } from 'src/repositories/base.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: BaseRepository<AccountEntity>,
  ) {}
  async register(body: any) {
    const account = await this.accountRepository.findOneById(body.id);
    return account;
  }
}
