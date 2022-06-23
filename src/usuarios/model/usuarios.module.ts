import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosController } from '../controllers/usuarios.controller';
import { UsuariosService } from '../service/usuarios.service';
import { User, UserSchema } from './user.model';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})

export class UsuariosModule {}
