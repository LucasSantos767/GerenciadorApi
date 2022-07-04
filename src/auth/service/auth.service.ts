import { UserToken } from './../model/UserToken';
import { UserPayload } from './../model/UserPayload';
import { User } from './../../usuarios/model/user.model';
import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/service/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usuariosService: UsuariosService, private readonly jwtService: JwtService) { }
    login(user: User): UserToken {
        const payload: UserPayload = {
            email: user.email,
            name: user.name,
            role: user.role
        };
        const jwtToken = this.jwtService.sign(payload);
        return {
            access_token: jwtToken,
        }
    }
    async validateUser(email: string, password: string) {
        const user = await this.usuariosService.findByEmail(email);
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return {
                    name: user.name,
                    email: user.email,
                    role: user.role
                };

            }
        }
        throw new Error('email ou senha incorreto');
    }
}