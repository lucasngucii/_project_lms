import { AccountEntity } from 'src/entities';
import { BaseRepository } from './base.repository';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

export class AccountRepository extends BaseRepository<AccountEntity> {
  async findAccountById(id: string): Promise<AccountEntity> {
    try {
      const result = await this.findOne({ where: { id: id } });
      console.log('Result:', result);
      if (!result) {
        console.log('Account not found');
        throw new NotFoundException('Account not found');
      }
      return result;
    } catch (error) {
      throw new NotFoundException('Find One By Id Fail');
    }
  }
  async findAccountByEmail(email: string): Promise<AccountEntity> {
    try {
      const result = await this.findOne({ where: { email: email } });
      if (!result) {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        'Find One By Email Fail',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAccountByUsername(username: string): Promise<AccountEntity> {
    try {
      const result = await this.findOne({ where: { username: username } });
      if (!result) {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        'Find One By Username Fail',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
