import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { User } from '../model/user.model';
import { UsuariosService } from '../service/usuarios.service';

@Controller()
export class UsuariosController { 
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post('register')
  create(@Body() createUsuarioDto: User) {
    return this.usuariosService.create(createUsuarioDto);
  }
  @Get('list-all')
  findAll() {
    return this.usuariosService.findAll();
  }
  @Get('search')
  findOne(@Body('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Patch('update')
  update(@Body('id') id:string, @Body() updateUsuarioDto: User) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete('delete')
  @ApiParam({name:'id'})
  remove(@Body('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
