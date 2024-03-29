import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ActionEvent} from './product.state';

@Injectable({providedIn:"root"})
export class EventDriverService {
  //pour faire communiquer des composant a travers un service il faut utliser un subject
  sourceEventSubject:Subject<ActionEvent>=new Subject<ActionEvent>();
  sourceEventSubjectObservable=this.sourceEventSubject.asObservable();

  sourceEventSubject2:Subject<ActionEvent>=new Subject<ActionEvent>();
  sourceEventSubjectObservable2=this.sourceEventSubject.asObservable();

  //cette methode permet de publier un evenement dans : sourceEventSubject à chaque fois que je l'appelle (la methode):
  // tous les composant qui font un subscribe a : sourceEventSubjectObservable ils vont recevoir l'évenement
  //sourceEventSubject : c'est la ou on peut publier des messages , les messages pour nous c'est : ActionEvent , a chaque fois que j'ai envoie d'envoyer des message a dautre composant de l'app il suffit d'appeller : publishEvent qui va publuer un message dans sourceEventSsubject et si un autre composant qui veut recevoir ces messages il suffit qu'il fasse un subscribe a sourceEventSubjectObservable.subscribe
  publishEvent(event:ActionEvent){
    this.sourceEventSubject.next(event);
  }
}
