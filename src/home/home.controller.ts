import { Controller, DefaultValuePipe, Get, ParseBoolPipe, Query, SerializeOptions } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHello() {
    return this.homeService.appInfo();
  } 
}
