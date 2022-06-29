import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from 'src/usuarios/model/usuarios.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports:[UsuariosModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions:{
      expiresIn:'1h'
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
 