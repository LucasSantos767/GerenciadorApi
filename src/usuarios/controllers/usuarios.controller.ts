import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from './../../auth/model/role.enum';
import { Controller, Get, Post, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { User } from '../model/user.model';
import { UsuariosService } from '../service/usuarios.service';
import { Roles } from 'src/auth/decorators/roles-decorator';

@Controller()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post('register')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() createUsuarioDto: User) {
    return this.usuariosService.create(createUsuarioDto);
  }
  @Get('list-all')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  findAll() {
    return this.usuariosService.findAll();
  }
  @Get('search')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  findOne(@Body('email') email: string) {
    return this.usuariosService.findByEmail(email);
  }

  @Patch('update')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  update(@Body('id') id: string, @Body() updateUsuarioDto: User) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete('delete')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'id' })
  remove(@Body('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
