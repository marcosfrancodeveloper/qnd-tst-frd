import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contribution-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ContributionItemComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() percentage?: number;
}
