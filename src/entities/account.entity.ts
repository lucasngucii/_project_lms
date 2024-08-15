import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IAccountEntity } from './interfaces';
import { EGender } from 'src/constants';
import { KeyTokenEntity } from './key-token.entity';
import { LoginHistoryEntity } from './login.entity';
import { EnrollmentEntity } from './enrollment.entity';
import { CourseEntity } from './course.entity';
import { ProgressEntity } from './progress.entity';
import { ReviewEntity } from './review.entity';
import { CertificateEntity } from './certificate.entity';

@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity<AccountEntity> implements IAccountEntity {
   @Index('IDX_ACCOUNT_USERNAME', { unique: true })
   @Column({ type: 'varchar', length: 255, unique: true })
   username: string;

   @Index('IDX_ACCOUNT_EMAIL', { unique: true })
   @Column({ type: 'varchar', length: 255 })
   email: string;

   @Column({ type: 'varchar', length: 255 })
   password: string;

   @Column({ type: 'boolean', default: false })
   isVerified: boolean;

   @Column({ type: 'timestamptz', nullable: true })
   lastLogin: Date | null;

   @Column({ type: 'varchar', length: 255 })
   fullName: string;

   @Column({ type: 'timestamptz' })
   birthDate: Date;

   @Column({ type: 'enum', enum: EGender, default: EGender.other })
   gender: EGender;

   @Column({ type: 'varchar', length: 255, nullable: true })
   avatar: string | null;

   @Column({ type: 'varchar', length: 15, nullable: true })
   phone: string | null;

   @Column({ type: 'varchar', length: 500, nullable: true })
   bio: string | null;

   @OneToMany(() => KeyTokenEntity, (keyToken) => keyToken.account)
   keyToken: KeyTokenEntity[];

   @OneToMany(() => LoginHistoryEntity, (history) => history.account)
   loginHistory: LoginHistoryEntity[];

   @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.account)
   enrollments: EnrollmentEntity[];

   @OneToMany(() => CourseEntity, (course) => course.instructor)
   courses: CourseEntity[];

   @OneToMany(() => ProgressEntity, (progres) => progres.course)
   progress: ProgressEntity[];

   @OneToMany(() => ReviewEntity, (review) => review.account)
   review: ReviewEntity[];

   @OneToMany(() => CertificateEntity, (certificate) => certificate.account)
   certificate: CertificateEntity[];
   account: KeyTokenEntity;
}
