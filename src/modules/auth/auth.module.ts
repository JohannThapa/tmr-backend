import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';

@Module({
  providers: [AuthService, JwtService],
})
export class AuthModule {}
