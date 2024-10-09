export type IBaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export interface IOption extends IBaseEntity {
  key?: string;
  value?: string;
}

export interface ICacheDb extends IBaseEntity {
  key?: string;
  type?: number;
  value?: string;
}

export interface IConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
  supabaseUrl: string;
  supabaseKey: string;
  s3AccessKeyId: string;
  s3SecretAccessKey: string;
  s3BucketName: string;
  s3Region: string;
  postgresHost: string;
  postgresPort: number;
  postgresUser: string;
  postgresPassword: string;
  postgresDb: string;
}

export interface IRequireEmail {
  email: string;
}

export interface IRequireId {
  id: string;
}

export interface IMetaData {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface IResource<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
  };
}
