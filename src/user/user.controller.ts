/* eslint-disable prettier/prettier */
import { Controller,  Post, UseGuards, Res, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';
import { Serialize } from 'src/utility/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorize.guard';
import { UserRoles } from 'src/utility/user-roles';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Serialize(UserDto)
  @Post('/sign-up')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto)
  }


  @Serialize(UserDto)
  @Post('/sign-in')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([UserRoles.Admin]))
  async signInUser(@Body() signInDto: SignInDto, @Res({passthrough: true}) res:Response): Promise<UserDto> {
    const user = await this.userService.login(signInDto);
    const token = await this.userService.generateToken(user);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000
    })
    return user
  }


}
