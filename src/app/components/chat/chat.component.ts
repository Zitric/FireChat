import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  message = '';
  element: any;

  constructor( public chat: ChatService) {

    this.chat.chargeMessages().subscribe( () => {
      this.element.scrollTop = this.element.scrollHeight;
    });
  }

  // When html is created
  ngOnInit() {
    setTimeout( () => {
      this.element = document.getElementById('app-messages');
    }, 100);
  }

  sendMessage() {
    if ( this.message.length === 0) {
      return;
    }
    this.chat.addMessage( this.message )
      .then( () => this.message = '' )
      .catch( () => console.log('Error sending'));
  }

}
