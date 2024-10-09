// export * from './development';
export const config = {
  db: {
    type: 'postgres',
    synchronize: false,
    logging: false,
    host: process.env['DB_HOST'] || 'localhost',
    port: process.env['DB_PORT'] || 5432,
    username: process.env['DB_USER'] || 'postgres',
    password: process.env['DB_PASSWORD'] || 'postgres',
    database: process.env['DB_NAME'] || 'internal',
    extra: {
      connectionLimit: 5,
    },
    autoLoadEntities: true,
  },
  graphql: {
    playground: false,
  },
};
