import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { UsuariosModule } from './usuarios/model/usuarios.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@db:27017/manager?authSource=admin'),
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
