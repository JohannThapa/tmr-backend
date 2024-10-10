import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialEntity, UserAddressEntity, UsersEntity } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // ...Object.values(tables)
      UsersEntity,
      UserAddressEntity,
      SocialEntity,
      // Sampletable2,
    ]),
    // FoobarModule, // Shared Module
  ],
  // controllers: Object.values(controllers),
  // providers: Object.values(providers),
})
export class UserModule {}
