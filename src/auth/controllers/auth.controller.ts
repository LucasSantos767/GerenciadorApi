import { AuthService } from './../service/auth.service';
import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login() {
        // return this.authService.login();
    }
}
