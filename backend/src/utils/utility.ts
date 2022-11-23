import bcryptjs from 'bcryptjs';

export function comparePassword(password: string, hashedPassword: string) {
  return bcryptjs.compareSync(password, hashedPassword);
}
