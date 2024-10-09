import type { INestApplication } from '@nestjs/common';
import compression from 'compression';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import { SupabaseConfig } from './configs/services';

export function middleware(
  app: INestApplication,
  supabaseConfig: SupabaseConfig,
): INestApplication {
  const isProduction = process.env['NODE_ENV'] === 'production';

  // Supabase client from SupabaseConfig
  const supabase = supabaseConfig.getClient();

  app.use((req, res, next) => {
    req.supabase = supabase; // Add Supabase client to each request
    next();
  });

  app.use(compression());

  app.use(
    session({
      // Requires 'store' setup for production
      secret: process.env['SESSION_SECRET'] || 'defaultSecret',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: isProduction },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  // TODO: Use this after deployment
  // app.use(
  //   helmet({
  //     contentSecurityPolicy: isProduction ? undefined : false,
  //     crossOriginEmbedderPolicy: isProduction ? undefined : false,
  //   }),
  // );
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );
  // app.enableCors({
  //   origin: true,
  // });
  return app;
}
