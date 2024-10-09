import { IBaseEntity } from './base.interface';

export interface IAddress extends IBaseEntity {
  street?: string;
  city?: string;
  province?: string;
  state?: string;
  country?: string;
  zip_code?: string;
}

export interface IProvince {
  name: string;
  districts: IDistricts[];
}
export interface IProvinceData extends IBaseEntity {
  name: string;
  districts: IDistricts[];
}

export interface IDistricts {
  name: string;
  cities: string[];
}
