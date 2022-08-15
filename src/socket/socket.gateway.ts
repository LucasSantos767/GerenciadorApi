import { Injectable } from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/usuarios/model/user.model';

@Injectable()
@WebSocketGateway(
  3001,

  {
    cors: {
      origin: '*',
    },
  },
)
export class SocketGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    server.on('connect', (socket: Socket) => {
      console.log('connected: ', socket.id);
    });

    server.on('disconnect', (socket: Socket) => {
      console.log('socket disconnected: ', socket.id);
    });
  }

  emitupdateUser(id: string) {
    this.server.emit('update',id);
    console.log('update back');
  }
  emitRemoveUser(id: string) {
    this.server.emit('removed-user',id);
    console.log('removed');
  }
  emitnewUser(User: User) {
    this.server.emit('new-user', User);
    console.log(`criado ${User}`);
  }
  emitUserLogged(User: User) {
    this.server.emit('is-logged',User.email);
    console.log(`user logado ${User.email}`);
  }
}