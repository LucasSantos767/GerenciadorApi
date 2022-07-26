import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsuariosController } from './controllers/usuarios.controller';
import { UsuariosService } from './service/usuarios.service';
import { User, UserSchema } from './model/user.model';
import { SocketGateway } from 'src/socket/socket.gateway';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsuariosController],
  providers: [SocketGateway, UsuariosService,{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
  exports:[UsuariosService]
})

export class UsuariosModule { }
