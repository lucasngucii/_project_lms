import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ILoginHistory } from './interfaces';
import { AccountEntity } from './account.entity';

@Entity({ name: 'login_history' })
export class LoginHistoryEntity extends BaseEntity<LoginHistoryEntity> implements ILoginHistory {
   @Column({ type: 'varchar', default: 'email' })
   loginMethod: string;
   @Column({ type: 'varchar' })
   ipAddress: string;
   @Column({ type: 'varchar' })
   userAgent: string;

   @ManyToOne(() => AccountEntity, (account) => account.loginHistory)
   account: AccountEntity;
}
