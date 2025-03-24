import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BottomBarComponent } from "./ui/common/bottom-bar/bottom-bar.component";
import { PlayerService } from './core/service/player/player.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BottomBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  playerService = inject(PlayerService);
  router = inject(Router);
  title = 'lombify';

}
