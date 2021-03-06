import { Role } from './../../auth/model/role.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export interface UserModel {

    name: string;
    email: string;
    password?: string;
    role?: Role;
}

export type UserDocument = User & Document;
@Schema()
export class User implements UserModel {

    @Prop({ required: true })
    @ApiProperty({
        description: 'Nome do usuário',
        type: String,
        example:'Lucas'
    })
    @IsNotEmpty({
        message: 'Digite um nome de Usuário'
    })
    name: string;

    @Prop({ required: true, unique: true })
    @ApiProperty({
        description: 'Email do usuário',
        type: String,
        example:'admin@gmail.com'
    })
    @IsEmail({}, { message: 'Digite um endereço de email válido.' })
    email: string;

    @Prop({ required: true })
    @ApiProperty({
        description: 'Senha do usuário',
        type: String,
        example:'admin123@'
    })
    password: string;

    @Prop({ required: true })
    @ApiProperty({
        description: 'Cargo do usuário',
        type: String,
        example:'admin'
    })
    @IsNotEmpty({
        message: 'Informe o cargo do usuário'
    })
    role?: Role;
    constructor(user?: Partial<User>) {
        this.name = user?.name;
        this.email = user?.email;
        this.password = user?.password;
        this.role = user?.role;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);