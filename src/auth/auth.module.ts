import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SocketGateway } from 'src/socket/socket.gateway';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthController } from './controllers/auth.controller';
import { RolesGuard } from './guards/roles.guard';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports:[UsuariosModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions:{
      expiresIn:'1h'
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard, SocketGateway]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
 