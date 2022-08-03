import { SocketGateway } from '../../socket/socket.gateway';
import { UserModel } from './../model/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../model/user.model';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private sockerModel: SocketGateway) { }

  async create(user: User): Promise<UserModel> {
    const data = {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }
    const RestUser = await this.userModel.create(data);
    this.sockerModel.emitnewUser(user);
    return { email: RestUser.email, name: RestUser.name }
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
  findAll() {
    return this.userModel.find();

  }
  async update(id: string, user: User) {
    user.password = await bcrypt.hash(user.password, 10),
    this.sockerModel.emitupdateUser(id);
    return this.userModel.findByIdAndUpdate(id, user);
  }

  remove(id: string) {
    this.sockerModel.emitRemoveUser(id);
    return this.userModel.findByIdAndDelete(id);
  } 
}
