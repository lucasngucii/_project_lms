import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AllExceptionFilter } from 'src/common';
import { AuthService } from './auth.service';

@Controller('auth')
@UseFilters(AllExceptionFilter)
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
