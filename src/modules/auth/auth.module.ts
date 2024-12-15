import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/modules/auth/local.strategy';
import { JwtStrategy } from 'src/core/guard/jwt.strategy';
import { UserModule } from 'src/modules/user/user.module';
import { Configuration } from 'src/core/config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Configuration>) => {
        const { JWT_SECRET, EXPIRES_IN } = configService.get('auth');

        return {
          secret: JWT_SECRET,
          signOptions: { expiresIn: EXPIRES_IN },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
