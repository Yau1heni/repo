import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  @Index()
  email: string;

  @Column({ select: false })
  passwordHash: string;
}
