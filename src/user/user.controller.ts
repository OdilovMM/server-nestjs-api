/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }


  @Post('/sign-in')
  async signInUser(@Body() signInDto: SignInDto) {
    return await this.userService.login(signInDto)
  }


}
