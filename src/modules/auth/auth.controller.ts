import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';
import { LocalAuthGuard } from 'src/modules/auth/auth.guard';
import { Public } from 'src/core/decorators/is-public.decorator';
import { JwtPayload } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.login(req.user as JwtPayload);
  }

  @Post('registration')
  @Public()
  registerUser(@Body() dto: RegisterUserDto) {
    return this.authService.registerUser(dto);
  }
}
