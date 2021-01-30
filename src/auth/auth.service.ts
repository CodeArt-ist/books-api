import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from './interface/user.interface';
import {JwtPayloadInterface} from "./interface/jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async login(authCredentialsDto: AuthCredentialsDto):Promise<{}> {
    const user = await this.validateUserPassword(authCredentialsDto);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload:UserInterface = { ...user };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken: accessToken };

  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<Promise<UserInterface> | BadRequestException> {
    try {
      const salt = await bcrypt.genSalt();

      createUserDto.password = await this.hashPassword(
        createUserDto.password,
        salt,
      );

      let userDto = {
        ...createUserDto,
        salt: salt,
      };
      const user = this.usersRepository.create(userDto);
      await this.usersRepository.save(user);
      const userInterface: UserInterface = {
        email: user.email,
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        isActive: user.isActive,
      };
      return userInterface;
    } catch (e) {
      if (e.errno === 1062) {
        throw new BadRequestException({
          status: 400,
          message: 'Duplicate Email',
        });
      } else {
        return e;
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserInterface> {
    const { email, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({ email: email });

    if (!user) {
      throw new NotFoundException({ status: 404, message: 'User Not Found !' });
    }

    if (user && (await user.validatePassword(password))) {
      const userInterface: UserInterface = {
        email: user.email,
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        isActive: user.isActive
      };

      return userInterface;
    } else {
      throw new UnauthorizedException();
    }
  }
}
