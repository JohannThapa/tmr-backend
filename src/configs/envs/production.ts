// envs/production.ts
export const config = {
  db: {
    type: process.env['DB_TYPE'] || 'postgres',
    synchronize: false,
    logging: false,
    replication: {
      master: {
        host: process.env['DB_HOST'] || 'localhost',
        port: process.env['DB_PORT'] || 5432,
        username: process.env['DB_USER'] || 'postgres',
        password: process.env['DB_PASSWORD'] || 'postgres',
        database: process.env['DB_NAME'] || 'internal',
      },
      slaves: [
        {
          host: 'slaveHost',
          port: 5432,
          username: 'username',
          password: 'password',
          database: 'dbname',
        },
      ],
    },
    extra: {
      connectionLimit: 30,
    },
    autoLoadEntities: true,
  },
  graphql: {
    debug: false,
    playground: false,
  },
  supabase: {
    url: process.env['SUPABASE_URL'],
    key: process.env['SUPABASE_KEY'],
  },
  foo: 'pro-bar',
};
