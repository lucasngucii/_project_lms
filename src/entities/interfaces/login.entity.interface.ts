import { IBaseEntity } from './base.entity.interface';

export interface ILoginHistory extends IBaseEntity {
   loginMethod: string;
   ipAddress: string;
   userAgent: string;
}
