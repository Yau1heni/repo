import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/user.entity';
import { UserRepository } from 'src/modules/user/user.repository';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ userId: number }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    const isAuth = await bcrypt.compare(password, user.passwordHash);
    if (!isAuth) {
      throw new NotFoundException();
    }

    return { userId: user.id };
  }

  async registerUser(dto: RegisterUserDto): Promise<number> {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = new User();
    user.email = dto.email;
    user.username = dto.username;
    user.passwordHash = passwordHash;
    const createdUser = await this.userRepository.save(user);

    return createdUser.id;
  }

  async login(userId: Express.User) {
    const token = this.jwtService.sign({ userId });

    return { accessToken: token };
  }
}
