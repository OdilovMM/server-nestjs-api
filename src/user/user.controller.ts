/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UseGuards,
  Res,
  Body,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';
import { Serialize } from 'src/utility/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorize.guard';
import { UserRoles } from 'src/utility/user-roles';
import { User } from './models/user.model';
import { ObjectId } from 'mongodb';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UpdateUserRolesDto } from './dto/update-role.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Serialize(UserDto)
  @Post('/sign-up')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  @Serialize(UserDto)
  @Post('/sign-in')
  async signInUser(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserDto> {
    const user = await this.userService.login(signInDto);
    const token = await this.userService.generateToken(user);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    return user;
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', { httpOnly: true });
    return { message: 'logout' };
  }

  @Get('/all-users')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([UserRoles.Admin]))
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([UserRoles.Admin]))
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(new ObjectId(id));
  }

  @Get('/me/profile')
  @UseGuards(AuthenticationGuard)
  async getMe(@CurrentUser() currentUser: User) {
    return await this.userService.findOne(currentUser._id);
  }

  @Patch('/roles/update')
  @UseGuards(AuthenticationGuard, AuthorizeGuard([UserRoles.Admin]))
  async updateRole(
    @Body() updateUserRolesDto: UpdateUserRolesDto,
  ): Promise<User> {
    return await this.userService.updateRoles(updateUserRolesDto);
  }

  @Get('/roles/authors')
  async getAuthors() {
    return await this.userService.getAuthors();
  }
}
