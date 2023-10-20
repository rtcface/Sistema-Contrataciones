/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from './models';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { NewUserInput } from './dtos';

const pubSub = new PubSub();

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((returns) => [User])
  async getUsers(): Promise<User[]> {
    const user = await this.userService.getUsers();
    if (!user) {
      throw new NotFoundException('No hay usuarios en el sistema');
    }
    return user;
  }

  @Mutation((returns) => User)
  async addUser(@Args('newUserData') newUserData: NewUserInput): Promise<User> {
    const recipe = await this.userService.create(newUserData);
    pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Subscription((returns) => User)
  UserAdded() {
    return pubSub.asyncIterator('recipeAdded');
  }
}
