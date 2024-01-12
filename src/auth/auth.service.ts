import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserTokenDto, NewUserInput } from '../users/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async AuthRegister({
    name,
    email,
    password,
  }: NewUserInput): Promise<UserTokenDto> {
    const foundUser = await this.userService.findUserByEmailGeneral(email);
    if (foundUser) {
      throw new Error('Email already exists');
    }
    const createdUser = await this.userService.create({
      name,
      email,
      password: await this.userService.hashePassword(password),
    });

    return {
      user: createdUser,
      token: this.singToken(createdUser.id),
    };
  }
  private singToken(id: string): string {
    return this.jwtService.sign({ id });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
