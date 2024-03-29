import { Component, OnInit } from '@angular/core';
import {EventDriverService} from '../../state/event.driver.service';
import {ActionEvent} from '../../state/product.state';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  counter:number=0;

  constructor(private eventDrivenService:EventDriverService) { }

  //c'est un composant qui fait un subscribe et qui ecoute les event a chaque evenement il incrémente
  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      ++this.counter;
    })
  }

}
