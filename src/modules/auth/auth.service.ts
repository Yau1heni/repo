import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/user.entity';
import { UserRepository } from 'src/modules/user/user.repository';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/modules/auth/types';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<JwtPayload> {
    const user = await this.userRepository.findByEmailForPasswordCheck(email);
    if (!user) {
      throw new NotFoundException();
    }
    const isAuth = await bcrypt.compare(password, user.passwordHash);
    if (!isAuth) {
      throw new NotFoundException();
    }

    return { userId: String(user.id), role: user.role };
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

  async login(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }
}
