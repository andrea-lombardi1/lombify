import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PlayerService } from '../../../core/service/player/player.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-bar',
  imports: [ButtonModule, RouterModule, CommonModule],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.css'
})
export class BottomBarComponent {
  playerService = inject(PlayerService);

}
