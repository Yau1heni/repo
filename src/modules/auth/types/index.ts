import { Role } from 'src/core/enums/roles.enum';

export type JwtPayload = {
  userId: string;
  role: Role;
};
