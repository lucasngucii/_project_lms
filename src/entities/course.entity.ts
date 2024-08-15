import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ICourse } from './interfaces';
import { CourseType } from 'src/constants';
import { EnrollmentEntity } from './enrollment.entity';
import { AccountEntity } from './account.entity';
import { CategoryEntity } from './category.entity';
import { TagEntity } from './tag.entity';
import { ProgressEntity } from './progress.entity';
import { CourseContentEntity } from './content.entity';
import { ModuleEntity } from './module.entity';
import { ReviewEntity } from './review.entity';
import { AssignmentEntity } from './assignment.entity';
import { QuizQuestionEntity } from './question.entity';
import { InteractionEntity } from './interaction.entity';

@Entity({ name: 'course' })
export class CourseEntity extends BaseEntity<CourseEntity> implements ICourse {
   @Index('IDX_COURSE_TITLE')
   @Column({ type: 'varchar', name: 'title' })
   title: string;

   @Column({ type: 'varchar', default: '', name: 'description' })
   description: string;

   @Column({ array: true, type: 'text', name: 'language', default: ['English'] })
   language: string[];

   @Column({ type: 'numeric', default: 0, name: 'price' })
   price: number;

   @Column({ type: 'varchar', default: '', name: 'level' })
   level: string;

   @Column({ type: 'numeric', default: 0, name: 'discount' })
   discount: number;

   @Column({ type: 'varchar', default: '', name: 'thunbnailUrl' })
   thunbnailUrl: string;

   @Column({
      type: 'enum',
      enum: CourseType,
      default: CourseType.DRAFT,
   })
   type: CourseType;

   @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.course)
   enrollments: EnrollmentEntity[];

   @ManyToOne(() => AccountEntity, (account) => account.courses)
   instructor: AccountEntity;

   @ManyToMany(() => CategoryEntity, { cascade: true })
   @JoinTable()
   categories: CategoryEntity[];

   @ManyToMany(() => TagEntity, (tag) => tag.courses)
   tags: TagEntity[];

   @OneToMany(() => ProgressEntity, (progres) => progres.course)
   progress: ProgressEntity;

   @OneToMany(() => CourseContentEntity, (content) => content.course)
   contents: CourseContentEntity[];

   @OneToMany(() => ModuleEntity, (module) => module.course)
   modules: ModuleEntity[];

   @OneToMany(() => ReviewEntity, (review) => review.course)
   reviews: ReviewEntity[];

   @OneToMany(() => AssignmentEntity, (assignment) => assignment.course)
   assignments: AssignmentEntity[];

   @OneToMany(() => QuizQuestionEntity, (quiz) => quiz.course)
   quiz: QuizQuestionEntity[];

   @ManyToOne(() => InteractionEntity, (interaction) => interaction.course)
   interaction: InteractionEntity;
}
