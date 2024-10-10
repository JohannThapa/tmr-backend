import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity, DistrictEntity, ProvinceEntity } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // ...Object.values(tables)
      AddressEntity,
      ProvinceEntity,
      DistrictEntity,
      // Sampletable2,
    ]),
    // FoobarModule, // Shared Module
  ],
  // controllers: Object.values(controllers),
  // providers: Object.values(providers),
})
export class AddressModule {}
