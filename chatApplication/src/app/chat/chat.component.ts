import { Component, Input, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  //  parentData = "Data from parent";
  messages: Message[] = [];
  username: string = '';

  constructor(public chatService: ChatService, private router: Router) { }

  ngOnInit(): void {
   
  }

  sendMessage(): void {
    if (this.username.trim() !== '') {
      
      const joinMessage: Message = {
        author: 'user',
        content: `${this.username} joined`
      };
      this.chatService.conversation.next([joinMessage]);

      
      this.router.navigate(['/signin', { username: this.username }]);
    }
  }
}
  

