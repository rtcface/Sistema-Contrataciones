import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../models';

@ObjectType()
export class UserTokenDto {
  @Field()
  readonly user: User;
  @Field()
  readonly token: string;
}
