import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/shared/decorators';
import { EUserRole } from 'src/shared/enums';
import { IUser } from 'src/shared/interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    const { user }: { user: IUser } = context.switchToHttp().getRequest();
    return roles.some((role: EUserRole) => user.roles?.includes(role));
  }
}
