import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/service/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usuariosService: UsuariosService) { }
    async validateUser(email: string, password: string) {
        const user = await this.usuariosService.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                };

            }
        }
        throw new Error('email ou senha incorreto');
    }
}