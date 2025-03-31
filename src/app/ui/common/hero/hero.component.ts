import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  readonly image = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
