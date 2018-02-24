import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor( private chat: ChatService ) { }

  ngOnInit() {
  }

  myLogin( provider: string ) {
    console.log(provider);
    this.chat.login(provider);
  }

}
