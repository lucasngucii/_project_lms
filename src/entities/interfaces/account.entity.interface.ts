import { EGender } from 'src/constants';
import { IBaseEntity } from './base.entity.interface';

export interface IAccountEntity extends IBaseEntity {
   username: string;
   password: string;
   email: string;
   isVerified: boolean;
   lastLogin: Date;

   fullName: string;
   birthDate: Date;
   gender: EGender;
   avatar: string;
   phone: string;
   bio: string;
}
