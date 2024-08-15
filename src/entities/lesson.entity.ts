import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ILesson } from './interfaces';
import { BaseEntity } from './base.entity';
import { ModuleEntity } from './module.entity';
import { TypeUploadEntity } from './type-upload.entity';
import { LessonTestEntity } from './lesson-test.entity';

@Entity({ name: 'course_lesson' })
export class CourseLessonEntity extends BaseEntity<CourseLessonEntity> implements ILesson {
   @Index('IDX_COURSE_LESSON')
   @Column({ type: 'varchar', name: 'lesson_title' })
   title: string;

   @Column({ type: 'varchar', name: 'lesson_content' })
   content: string;

   @Column({ type: 'varchar', name: 'lesson_video_url' })
   videoUrl: string;

   @Column({ type: 'varchar', name: 'lesson_duration' })
   duration: string;

   @Column({ type: 'int', name: 'lesson_order_index' })
   orderIndex: number;

   @ManyToOne(() => ModuleEntity, (module) => module.lessons)
   module: ModuleEntity;

   @OneToOne(() => TypeUploadEntity, { cascade: true })
   @JoinColumn()
   typeUpload: TypeUploadEntity;

   @ManyToOne(() => LessonTestEntity, (lesson) => lesson.lessons)
   lessonTest: LessonTestEntity;
}
