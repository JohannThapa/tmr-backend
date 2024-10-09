export const config = {
  db: {
    entities: [`${__dirname}/../../entities/**/*.{js,ts}`],
    // subscribers: [`${__dirname}/../../subscriber/**/*.{js,ts}`],
    // migrations: [`${__dirname}/../../migration/**/*.{js,ts}`],
  },
  graphql: {
    debug: true,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    autoSchemaFile: true,
    autoTransformHttpErrors: true,
  },
  supabase: {
    url: process.env['SUPABASE_URL'],
    key: process.env['SUPABASE_KEY'],
  },
  hello: 'world',
  jwtSecret: process.env['JWT_SECRET'],
  jwtRefreshSecret: process.env['JWT_REFRESH_SECRET'],
};
