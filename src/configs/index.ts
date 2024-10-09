import type { Config, Default, Objectype, Production } from './interfaces';

const util = {
  isObject<T>(value: T): value is T & Objectype {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },
  merge<T extends Objectype, U extends Objectype>(target: T, source: U): T & U {
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        Object.assign(sourceValue, this.merge(targetValue, sourceValue));
      }
    }

    return { ...target, ...source };
  },
};

export const configuration = async (): Promise<Config> => {
  // Import the default config (shared settings)
  const { config } = <{ config: Default }>(
    await import(`${__dirname}/envs/default`)
  );

  // Import the environment-specific config (development or production)
  const { config: environment } = <{ config: Production }>(
    await import(
      `${__dirname}/envs/${process.env['NODE_ENV'] || 'development'}`
    )
  );

  // Return the merged configuration, adding the Supabase setup
  return util.merge(config, environment);
};