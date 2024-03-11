import { Component, Input, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{
  // parentData = "Data from parent";
  // @Input() childData: string= '';
  // private messageSubscription: Subscription;
  // public messages: Message[] = [];
  username: string = '';
  messages:Message[]=[];
  value:string | undefined
  dialogInfo: boolean = false;
  nameField: string = '';
  // constructor(private websocketService: WebsocketService) { }
  // ngOnInit(): void {
  //   this.websocketService.connect();
  //   this.messageSubscription = this.websocketService.getMessage().subscribe((message) => {
  //     this.messages.push(message);
  //   });
  // }

  // ngOnDestroy(): void {
  //   this.messageSubscription.unsubscribe();
  //   this.websocketService.disconnect();
  // }
  // sendMessage(message: string): void {
  //   this.websocketService.sendMessage(message);
  // }
  constructor(public chatService:ChatService) { }
  
  ngOnInit():void{
    this.chatService.conversation.subscribe((val)=>{
      this.messages=this.messages.concat(val);
    });

  }

  sendMessage() {
     this.chatService.getBotAnswer(this.value);
     this.value=''
  }

}
