import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  message = '';

  constructor( private chat: ChatService) {

    this.chat.chargeMessages().subscribe( ( messages: any[] ) => {
      console.log(messages);
    });
  }

  ngOnInit() {
  }

  sendMessage() {
    console.log( this.message );
  }

}
