import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { User } from '../model/user.model';
import { UsuariosService } from '../service/usuarios.service';

@Controller('usuarios')
export class UsuariosController { 
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  create(@Body() createUsuarioDto: User) {
    return this.usuariosService.create(createUsuarioDto);
  }
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id:string, @Body() updateUsuarioDto: User) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiParam({name:'id'})
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
