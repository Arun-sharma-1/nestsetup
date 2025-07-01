import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
      console.log('client connected with id ', client.id);
    //   this.server.emit('testReply', `client connected with id ${client.id}`)
      client.broadcast.emit('testReply', `client connected with id ${client.id}`)
  }
  handleDisconnect(client: any) {
      console.log('client disconnected with id ', client.id);
    //   this.server.emit('testReply', `client disconnected with id ${client.id}`)
      client.broadcast.emit('testReply', `client disconnected with id ${client.id}`)
  }

  @SubscribeMessage('testMessage')
  handleMessage(
    @MessageBody() message: any,
    @ConnectedSocket() client: Socket,
  ) {
    // console.log('client', client);
    console.log('message -> ', message);

    this.server.emit('testReply', 'Testing the send fun');
  }
}
