import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { UsuariosModule } from './usuarios/model/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@db:27017/manager?authSource=admin'),
    UsuariosModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
