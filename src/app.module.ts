import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/model/usuarios.module';

@Module({
  imports: [UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
