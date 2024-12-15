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
    private usersOrmRepository: Repository<User>,
    private readonly errorUtils: ErrorUtils,
  ) {}

  async save(user: User): Promise<User> {
    try {
      return await this.usersOrmRepository.save(user);
    } catch (error) {
      const errorMessage = this.errorUtils.getErrorMessage(
        error,
        PostgresError.UNIQUE_VIOLATION,
        'That username is taken',
      );
      throw new ConflictException(errorMessage);
    }
  }

  async findByEmail(email: string) {
    return this.usersOrmRepository.findOneBy({ email });
  }

  async findById(id: number) {
    return this.usersOrmRepository.findOneBy({ id });
  }

  async findAll() {
    return this.usersOrmRepository.find();
  }

  async deleteUser(id: number) {
    await this.usersOrmRepository.delete(id);
  }
}
