import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';
import { UserService } from 'src/modules/users/services/user.service';
import {
  IJwtPayload,
  IJwtTokenResponse,
  IPayload,
} from 'src/shared/interfaces';

@Injectable()
export class JwtService {
  private supabase: SupabaseClient;

  // constructor(
  //   private readonly jwtService: NestJwtService,
  //   private readonly configService: ConfigService,
  //   private readonly userService: UserService, // User service to fetch user data
  // ) {
  //   // Initializing Supabase client
  //   this.supabase = new SupabaseClient(
  //     this.configService.get('SUPABASE_URL'),
  //     this.configService.get('SUPABASE_KEY'),
  //   );
  // }
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  signJwt(payload: IJwtPayload): IJwtTokenResponse {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  // Signing the Access Token
  public async signAccessToken(payload: IPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRY') || '15m',
    });
  }

  // Signing the Refresh Token
  public async signRefreshToken(payload: IPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRY') || '7d',
    });
  }

  // Verifying the Access Token
  public async verifyAccessToken(token: string): Promise<IJwtPayload> {
    try {
      return await this.jwtService.verifyAsync<IJwtPayload>(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid Access Token');
    }
  }

  // Verifying the Refresh Token
  public async verifyRefreshToken(token: string): Promise<IJwtPayload> {
    try {
      return await this.jwtService.verifyAsync<IJwtPayload>(token, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid Refresh Token', e);
    }
  }

  // Function to refresh token
  public async refreshTokens(
    oldRefreshToken: string,
  ): Promise<IJwtTokenResponse> {
    const payload = await this.verifyRefreshToken(oldRefreshToken);
    const user = await this.userService.findUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // New tokens
    const newAccessToken = await this.signAccessToken({
      userId: user.id,
      username: user.username,
      roles: user.roles,
    });
    const newRefreshToken = await this.signRefreshToken({
      userId: user.id,
      username: user.username,
      roles: user.roles,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}