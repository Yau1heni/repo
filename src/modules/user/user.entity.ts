import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity, Index } from 'typeorm';
import { Role } from 'src/core/enums/roles.enum';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  @Index()
  username: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User],
  })
  role: Role;

  @Column({ select: false })
  passwordHash: string;
}
