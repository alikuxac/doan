import { UserRole } from '@modules/user/user.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const NOROLE_KEY = 'no_roles';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

export const NoRolesRequired = () => SetMetadata(NOROLE_KEY, true);
