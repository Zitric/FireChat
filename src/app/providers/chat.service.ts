import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Message } from '../interface/message.interface';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;

  public chats: Message[] = [];
  public myUser: any = {};

  constructor( private afs: AngularFirestore,
               public afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe( user => {
      if (!user) {
        return;
      }

      this.myUser.name = user.displayName;
      this.myUser.uid = user.uid;
    });
  }

  login( provider: string ) {
    if ( provider === 'google') {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());

    }
  }

  logout() {
    this.myUser = {};
    this.afAuth.auth.signOut();
  }

  chargeMessages() {

    this.itemsCollection = this.afs
      .collection<Message>('chats',
        ref => ref.orderBy('date', 'desc').limit(10));
    return this.itemsCollection.valueChanges().map( ( messages: Message[]) => {

      this.chats = [];
      for (const message of messages ) {
        this.chats.unshift( message );
      }
    });
  }

  addMessage( text: string ) {

    const message: Message = {
      name: this.myUser.name,
      message: text,
      date: new Date().getTime(),
      uid: this.myUser.uid
    }
    return this.itemsCollection.add( message );
  }

}
