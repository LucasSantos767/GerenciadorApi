import { SocketGateway } from './../../socket/socket.gateway';
import { IsPublic } from './../decorators/is-public-decorator';
import { AuthService } from './../service/auth.service';
import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthRequest } from '../model/AuthRequest';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService,private readonly socketGateway: SocketGateway) { }

    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest) {
        this.socketGateway.emitUserLogged()
        return this.authService.login(req.user)
    }
}
