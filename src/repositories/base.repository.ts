import { HttpException, HttpStatus, Logger } from '@nestjs/common';

import { EntityManager, EntityTarget, Repository } from 'typeorm';

export abstract class BaseRepository<T> extends Repository<T> {
  protected logger: Logger = new Logger();
  constructor(target: EntityTarget<T>, entity: EntityManager) {
    super(target, entity);
  }
  async findOneById(id: string): Promise<T> {
    try {
      console.log('id', id);
      const result = await this.findOneById(id);
      console.log('result', result);
      if (!result) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        'Find One By Id Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
