import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IProgressDetailEntity } from './interfaces';
import { ProgressEntity } from './progress.entity';
import { CourseLessonEntity } from './lesson.entity';

@Entity({ name: 'progress_detail' })
export class ProgresDetailsEntity
   extends BaseEntity<ProgresDetailsEntity>
   implements IProgressDetailEntity
{
   @Column({ type: 'varchar', name: 'content_type' })
   contentType: string;

   @Column({ type: 'boolean', default: false, name: 'is_completed' })
   isCompleted: boolean;

   @ManyToOne(() => ProgressEntity, (progres) => progres.details)
   progres: ProgressEntity;

   @OneToOne(() => CourseLessonEntity, { cascade: true })
   @JoinColumn()
   lesson: CourseLessonEntity;
}
