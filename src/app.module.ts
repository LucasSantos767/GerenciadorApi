import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';
import { SocketGateway } from './socket/socket.gateway';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECT),
    UsuariosModule,
    AuthModule,
    SocketModule,
  ],
  controllers: [],
  providers: [SocketGateway],
})
export class AppModule { }
