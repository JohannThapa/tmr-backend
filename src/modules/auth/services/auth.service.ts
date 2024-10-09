import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js'; // Supabase integration
import { UserService } from 'src/modules/users/services/user.service';
import { IJwtPayload, IJwtTokenResponse } from 'src/shared/interfaces';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  //   constructor(
  //     private readonly jwtService: JwtService,
  //     private readonly configService: ConfigService,
  //     private readonly userService: UserService, // UserService for handling user-related logic
  //   ) {
  //     // Supabase client initialization
  //     this.supabase = createClient(
  //       this.configService.get<string>('SUPABASE_URL'),
  //       this.configService.get<string>('SUPABASE_KEY'),
  //     );
  //   }
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
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

  verifyAccessToken(token: string): IJwtPayload {
    return this.jwtService.verify<IJwtPayload>(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  verifyRefreshToken(token: string): IJwtPayload {
    return this.jwtService.verify<IJwtPayload>(token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  //   async validateUser(email: string, password: string): Promise<IAuthUser | null> {
  //     const { data, error } = await this.supabase
  //       .from('users')
  //       .select('*')
  //       .eq('email', email)
  //       .single();

  //     if (error || !data) {
  //       throw new UnauthorizedException('Invalid credentials');
  //     }

  //     const validPassword = await this.validatePassword(password, data.passwordHash);
  //     if (!validPassword) {
  //       throw new UnauthorizedException('Invalid credentials');
  //     }

  //     return this.userService.mapUser(data); // Mapping Supabase data to IAuthUser
  //   }

  private async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // Your password validation logic (bcrypt or other)
    return plainPassword === hashedPassword; // Simplified example
  }

  //   async login(user: ILoginPayload): Promise<ILoginResult> {
  //     const tokens = await this.generateTokens({ email: user.email });
  //     return { user, tokens };
  //   }

  // async refreshTokens(refreshToken: string): Promise<JwtTokenResult> {
  //   try {
  //     const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
  //       secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
  //     });

  //     const user = await this.userService.findById(payload.sub);
  //     if (!user) {
  //       throw new UnauthorizedException('User not found');
  //     }

  //     return this.generateTokens({ userId: user.userId, username: user.username, roles: user.roles });
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }

  private async generateTokens(
    payload: IJwtPayload,
  ): Promise<IJwtTokenResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  //   async uploadMediaToS3(file: Express.Multer.File): Promise<string> {
  //     // AWS S3 logic here to upload media files
  //     // Return the URL of the uploaded file
  //     return 'https://s3.amazonaws.com/yourbucket/file.jpg'; // Simplified
  //   }
}
