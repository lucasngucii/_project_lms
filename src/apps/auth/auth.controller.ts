import { Body, Controller, Post } from '@nestjs/common';
import { CustomLogger } from 'src/loggers';

@Controller('auth')
export class AuthController {
  /**
   *
   */
  constructor(private customeLog: CustomLogger) {
    this.customeLog.setContext(AuthController.name);
  }
  @Post('register')
  async register(@Body() body: any) {
    console.log(body);
    this.customeLog.warn('This is a warning message');
  }
}
