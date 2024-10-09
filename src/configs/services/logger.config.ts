import type { Request } from 'express';
import type { Params } from 'nestjs-pino';
import { multistream } from 'pino';
import type { ReqId } from 'pino-http';

const passUrl = new Set(['/users']);
async function getNanoId() {
  const { nanoid } = await import('nanoid');
  return nanoid();
}
export const loggerOptions: Params = {
  pinoHttp: [
    {
      quietReqLogger: true,
      genReqId: async (req): Promise<ReqId> =>
        (<Request>req).header('X-Request-Id') ?? (await getNanoId()),
      ...(process.env['NODE_ENV'] === 'production'
        ? {}
        : {
            level: 'debug',
            transport: {
              target: 'pino-pretty',
              options: { sync: true, singleLine: true },
            },
          }),
      autoLogging: {
        ignore: (req) => passUrl.has((<Request>req).originalUrl),
      },
      customProps: (req) => (req as Request)?.customProps || {},
    },
    multistream(
      [
        { level: 'debug', stream: process.stdout },
        { level: 'error', stream: process.stderr },
        { level: 'fatal', stream: process.stderr },
      ],
      { dedupe: true },
    ),
  ],
};
