import type { Type } from '@nestjs/common';

export class ClassRef {
  [index: string]: Type;
}

type Func<TArgs extends any[], TResult> = (...args: TArgs) => TResult;

export type Metatype<T = unknown, TArgs extends any[] = any[], TResult = any> =
  | Type<T>
  | Func<TArgs, TResult>;
export interface DebugModuleOptions {
  exclude?: string[];
}

export interface DebugOptions {
  context?: string;
  exclude?: Metatype[];
}
