import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Field()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  readonly avatar: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  readonly status: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  readonly role: string;
}
