import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from './../../auth/model/role.enum';
import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { User } from '../model/user.model';
import { UsuariosService } from '../service/usuarios.service';
import { Roles } from '../../auth/decorators/roles-decorator';

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
  @Get('search/:email')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RolesGuard)
  @ApiParam({name:'email'})
  findOne(@Param('email') email: string) {
    return this.usuariosService.findByEmail(email);
  }

  @Patch('update/:id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateUsuarioDto: User) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}
