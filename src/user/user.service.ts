/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {hash, compare} from 'bcrypt'

import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existUser = await this.userModel.findOne({email: createUserDto.email});
    if(existUser) throw new BadRequestException('User already exist');
    createUserDto.password = await hash(createUserDto.password, 12);
    const user = await this.userModel.create(createUserDto);
    user.password = '';
    return user;
  }

  async login(signInDto: SignInDto) {
    const existUser = await (await this.userModel.findOne({email: signInDto.email}))
    if(!existUser) throw new NotFoundException('User not exist');
    const passwordMatch:boolean = await compare(signInDto.password, existUser.password);
    if(!passwordMatch) throw new UnauthorizedException('Incorrect credentials');
    return existUser
  }




}
