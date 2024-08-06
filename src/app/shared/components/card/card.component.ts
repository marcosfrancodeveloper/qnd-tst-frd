import { Component, Input } from '@angular/core';
import { ICardData } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() data!: ICardData;
}
