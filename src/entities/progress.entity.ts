import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ICourseProgress } from './interfaces';
import { CourseEntity } from './course.entity';
import { AccountEntity } from './account.entity';
import { ProgresDetailsEntity } from './progres-detail.entity';

@Entity({ name: 'course_progress' })
export class ProgressEntity extends BaseEntity<ProgressEntity> implements ICourseProgress {
   @Column({ type: 'boolean', default: false, name: 'completed_lessons' })
   completedLessons: boolean;

   @Column({ type: 'boolean', default: false, name: 'completed_quizzes' })
   completedQuizzes: boolean;

   @Column({ type: 'numeric', default: 0, name: 'progress_percentage' })
   progressPercentage: number;

   @CreateDateColumn({ name: 'last_accessed_at', default: new Date() })
   lastAccessedAt: Date;

   @ManyToOne(() => CourseEntity, (course) => course.progress)
   course: CourseEntity;

   @ManyToOne(() => AccountEntity, (account) => account.progress)
   account: AccountEntity;

   @OneToMany(() => ProgresDetailsEntity, (progres) => progres.progres)
   details: ProgresDetailsEntity[];
}
