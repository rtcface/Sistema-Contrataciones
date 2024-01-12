import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserTokenDto } from '../users/dtos';
import { NewUserInput } from '../users/dtos/new-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserTokenDto)
  async register(@Args('input') inputUser: NewUserInput) {
    return this.authService.AuthRegister(inputUser);
  }
}
