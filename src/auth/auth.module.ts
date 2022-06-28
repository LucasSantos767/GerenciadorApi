import { Module } from '@nestjs/common';
import { UsuariosModule } from 'src/usuarios/model/usuarios.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports:[UsuariosModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
 