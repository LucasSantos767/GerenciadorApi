import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../model/user.model';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
  create(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  findAll(){
    return this.userModel.find();

  }

  findOne(id: string){
   return this.userModel.findById(id);
  }

  update(id: string, user: User) {
    return this.userModel.findByIdAndUpdate(id,user);
  }

  remove(id: string){
    return this.userModel.findByIdAndDelete(id);
  }
}
