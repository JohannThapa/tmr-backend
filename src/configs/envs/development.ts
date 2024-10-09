export const config = {
  db: {
    type: process.env['DB_TYPE'] || 'postgres',
    synchronize: false,
    logging: true,
    host: process.env['DB_HOST'] || 'localhost',
    port: process.env['DB_PORT'] || 5432,
    username: process.env['DB_USER'] || 'postgres',
    password: process.env['DB_PASSWORD'] || 'postgres',
    database: process.env['DB_NAME'] || 'internal',
    extra: {
      connectionLimit: 10,
    },
    autoLoadEntities: true,
  },
  supabase: {
    url: process.env['SUPABASE_URL'],
    key: process.env['SUPABASE_KEY'],
  },
  foo: 'dev-bar',
};
