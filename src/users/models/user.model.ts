/* eslint-disable @typescript-eslint/no-unused-vars */
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User ' })
export class User {
  @Field((type) => ID)
  readonly id: string;

  @Directive('@upper')
  readonly name: string;

  @Field()
  readonly email: string;
  password: string;

  @Field()
  readonly creationDate: Date;

  @Field({ nullable: true })
  readonly avatar?: string;

  @Field((type) => [String])
  readonly role: string[];

  @Field()
  readonly status: string;
}
