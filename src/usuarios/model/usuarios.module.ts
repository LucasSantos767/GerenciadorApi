import { Module } from '@nestjs/common';
import { UsuariosService } from '../service/usuarios.service';
import { UsuariosController } from '../controllers/usuarios.controller';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
