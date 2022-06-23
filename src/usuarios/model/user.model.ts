import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {

    @Prop({ required: true })
    @ApiProperty()
    name: string;

    @Prop({ required: true, unique:true })
    @ApiProperty()
    email: string;

    @Prop({ required: true })
    @ApiProperty()
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);