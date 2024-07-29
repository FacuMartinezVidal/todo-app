import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { addDTO, updateDTO } from './todo.entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll() {
    return await this.appService.findAll();
  }

  @Put('/:id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updateDTO,
  ) {
    await this.appService.updateTodo(id, body.status);
    return { status: 'ok', success: true };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async addTodo(@Body() body: addDTO) {
    await this.appService.addTodo(body.title);
    return { status: 'ok', success: true };
  }

  @Delete('/:id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    await this.appService.deleteTodo(id);
    return { status: 'ok', success: true };
  }
}
