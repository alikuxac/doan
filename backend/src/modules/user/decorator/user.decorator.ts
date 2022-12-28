import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

//define id or email of the current user
export const User = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException();
    }
    if (key) {
      return request.user[key];
    }
    return request.user;
  },
);
