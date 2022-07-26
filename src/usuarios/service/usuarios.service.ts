import { SocketGateway } from 'src/socket/socket.gateway';
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
  update(id: string, user: User) {
    this.sockerModel.emitupdateUser(id);
    return this.userModel.findByIdAndUpdate(id, user);
  }

  remove(id: string) {
    this.sockerModel.emitRemoveUser(id);
    return this.userModel.findByIdAndDelete(id);
  } 
}
