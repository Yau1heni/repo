import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostgresError } from 'pg-error-enum';
import { ErrorUtils } from 'src/core/utils/error.utils';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userOrmRepository: Repository<User>,
    private readonly errorUtils: ErrorUtils,
  ) {}

  async save(user: User): Promise<User> {
    try {
      return await this.userOrmRepository.save(user);
    } catch (error) {
      const errorMessage = this.errorUtils.getErrorMessage(
        error,
        PostgresError.UNIQUE_VIOLATION,
        'That username is taken',
      );
      throw new ConflictException(errorMessage);
    }
  }

  async findByEmailForPasswordCheck(email: string) {
    return await this.userOrmRepository.findOne({
      where: { email },
      select: ['id', 'role', 'passwordHash'],
    });
  }

  async findById(id: number) {
    return this.userOrmRepository.findOneBy({ id });
  }

  async findAll() {
    return this.userOrmRepository.find();
  }

  async deleteUser(id: number) {
    await this.userOrmRepository.delete(id);
  }
}
