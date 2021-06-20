import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { UserModel } from 'src/database/models/user.model'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor (private usersService: UsersService) {}

  @Get()
  async findAll () {
    return this.usersService.findAll()
  }

  @Get(':id')
  async findOne (@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.findOneById(id)
  }

  @Post()
  async create (@Body() props: Partial<UserModel>) {
    return this.usersService.create(props)
  }

  @Delete(':id')
  async delete (@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.delete(id)
  }

  @Put(':id')
  async update (
    @Param('id', new ParseIntPipe()) id: number,
    @Body() props: Partial<UserModel>,
  ) {
    return this.usersService.update(id, props)
  }
}
