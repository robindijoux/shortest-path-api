import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): string {
    return 'Server up.';
  }

  @Post()
  postGameConfig(
    @Body() gameConfig: { board: number[][]; start: number[]; stop: number[]; algoId: number; },
  ): { path: number[][] } {
    console.log(JSON.stringify(gameConfig, null, 2));
    return this.appService.getPathForGameConfig(gameConfig);
  }
}
