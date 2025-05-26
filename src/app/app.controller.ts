import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'src/core/decorator/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/health')
  getHealth() {
    return this.appService.getHealth()
  }
}
