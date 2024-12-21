import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from 'src/core/enums/roles.enum';
import { Roles } from 'src/core/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth-guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAlUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  async getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
