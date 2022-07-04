import { Role } from 'src/auth/model/role.enum';
export interface UserPayload {
    email: string;
    name: string;
    role: Role;
    iat?: number;
    exp?: number;
}