import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {CreateConfigDto} from "./create-config.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getConnection(): string {
    return this.appService.getHello();
  }

    @Post()
    createConfig(@Body() dto: CreateConfigDto) {
      console.log(dto);
        return {
            message: 'Configuration reçue avec succès',
            payload: dto,
        };
    }
}
