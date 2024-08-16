import { EntityManager, EntityTarget, Repository } from 'typeorm';

export abstract class BaseRepository<T> extends Repository<T> {
  constructor(target: EntityTarget<T>, entity: EntityManager) {
    super(target, entity);
  }
  
}
