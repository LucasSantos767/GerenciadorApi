import { AuthService } from './../service/auth.service';
import { Controller, HttpCode, HttpStatus, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login() {
       
    }
}
