/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { sign } from 'jsonwebtoken';
import { UserDto } from './dto/user.dto';
import { ObjectId } from 'mongodb';
import { UpdateUserRolesDto } from './dto/update-role.dto';
import { UserRoles } from 'src/utility/user-roles';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const existUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existUser) throw new BadRequestException('User already exist');
    createUserDto.password = await hash(createUserDto.password, 12);
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async login(signInDto: SignInDto): Promise<UserDto> {
    const existUser = await this.userModel
      .findOne({ email: signInDto.email })
      .select('+password')
      .lean();
    if (!existUser) throw new NotFoundException('User not exist');
    const passwordMatch: boolean = await compare(
      signInDto.password,
      existUser.password,
    );
    if (!passwordMatch)
      throw new UnauthorizedException('Incorrect credentials');
    return existUser;
  }

  async generateToken(user: User): Promise<string> {
    return sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.EXPIRES_IN },
    );
  }

  async findOneForMiddleware(_id: ObjectId): Promise<User> {
    return await this.userModel.findById(_id);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: ObjectId): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateRoles(updateUserRolesDto: UpdateUserRolesDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      new ObjectId(updateUserRolesDto.id),
    );
    if (!user) throw new NotFoundException('User not found');
    user.roles = updateUserRolesDto.roles;
    return await user.save();
  }

  async getAuthors() {
    return await this.userModel
      .find({ roles: UserRoles.Author })
      .select('_id name avatar');
  }
}
