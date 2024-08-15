import { IBaseEntity } from './base.entity.interface';

export interface IKeyTokenEntity extends IBaseEntity {
   privateKey: string;
   publicKey: string;
   refreshToken: string;
   accessToken: string;
   refreshTokenUsed: string[];
}
