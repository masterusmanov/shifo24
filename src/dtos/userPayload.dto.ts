import { Role } from 'src/enums/role.enum';

export interface UserPayload {
  id: string;
  role: Role;
  phone: string;
}
