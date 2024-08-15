import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IKeyTokenEntity } from './interfaces';
import { AccountEntity } from './account.entity';

@Entity({ name: 'key_token' })
export class KeyTokenEntity extends BaseEntity<KeyTokenEntity> implements IKeyTokenEntity {
   @Column({ type: 'varchar', default: '' })
   privateKey: string;
   @Column({ type: 'varchar', default: '' })
   publicKey: string;
   @Column({ type: 'varchar', default: '' })
   refreshToken: string;
   @Column({ type: 'varchar', default: '' })
   accessToken: string;

   @Column({ type: 'text', default: [], array: true })
   refreshTokenUsed: string[];


   @ManyToOne(() => AccountEntity, (account) => account.keyToken)
   account: AccountEntity;
}
