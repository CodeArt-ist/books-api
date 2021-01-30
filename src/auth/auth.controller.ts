import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserInterface } from './interface/user.interface';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.authService.findOne(id);
  }

  @Post('/')
  async register(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<Promise<UserInterface> | BadRequestException> {
    return await this.authService.register(createUserDto);
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{}> {
    return this.authService.login(authCredentialsDto);
  }
}
