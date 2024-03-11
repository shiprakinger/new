// websocket.service.ts
import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client: Client;
  private messageSubject: Subject<Message> = new Subject<Message>();

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://your-websocket-server-url',
      debug: (str) => {
        console.log(str);
        console.log(str);
      },
      reconnectDelay: 5000
    });
    this.client.onConnect = (frame) => {
      this.client.subscribe('/topic/messages', (message) => {
        this.messageSubject.next(message);
      });
    };
  }

  public connect(): void {
    this.client.activate();
  }

  public disconnect(): void {
    this.client.deactivate();
  }

  public sendMessage(message: string): void {
    this.client.publish({ destination: '/app/chat', body: message });
  }

  public getMessage(): Observable<Message> {
    return this.messageSubject.asObservable();
  }
}
