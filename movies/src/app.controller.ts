import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  getHello(@Req() req: Request): string {
    return this.appService.getHello();
  }

  @Get('/movies')
  auth() {
    
  }

}
