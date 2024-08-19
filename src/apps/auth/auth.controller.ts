import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common';
import { AuthService } from './auth.service';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  /**
   *
   */
  constructor(private readonly authServices: AuthService) {}
  @Post('register')
  async register(@Body() body: any) {
    return await this.authServices.register(body);
  }
}
