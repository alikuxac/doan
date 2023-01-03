import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRole } from '@modules/user/user.enum';
import { Observable } from 'rxjs';
import { ROLES_KEY, NOROLE_KEY } from '../decorators/role.decorator';
import { User } from '@modules/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const NoRolesRequired = this.reflector.get<boolean>(
      NOROLE_KEY,
      context.getHandler(),
    );

    if (!requiredRoles || NoRolesRequired) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (user.isAdmin) return true;

    return requiredRoles.some((role) => user.role.includes(role));
  }
}
