import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
    
    @Prop({ required: true })
    @ApiProperty()
    @IsNotEmpty({
        message: 'Digite um nome de Usuário'
    })
    name: string;

    @Prop({ required: true, unique: true })
    @ApiProperty()
    @IsEmail({}, { message: 'Digite um endereço de email válido.' })
    email: string;

    @Prop({ required: true })
    @ApiProperty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Senha Fraca.',
    })
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);