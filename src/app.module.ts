import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@db:27017/manager?authSource=admin'),
    UsuariosModule,
    AuthModule,
    SocketModule,
  ],
  controllers: [],
  providers: [SocketGateway],
})
export class AppModule { }
