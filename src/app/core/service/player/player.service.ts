import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private player: HTMLAudioElement | HTMLVideoElement | null = null;

  constructor() { }

  initializePlayer(fileUrl: string): void {
    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
    if (fileExtension === 'm4a') {
      this.player = new Audio(fileUrl);
    } else if (fileExtension === 'm4v') {
      this.player = document.createElement('video');
      this.player.src = fileUrl;
    } else {
      throw new Error('Unsupported file format. Only .m4a and .m4v are supported.');
    }
  }

  play(): void {
    if (this.player) {
      this.player.play();
    } else {
      console.error('Player is not initialized.');
    }
  }

  pause(): void {
    if (this.player) {
      this.player.pause();
    } else {
      console.error('Player is not initialized.');
    }
  }

  stop(): void {
    if (this.player) {
      this.player.pause();
      this.player.currentTime = 0;
    } else {
      console.error('Player is not initialized.');
    }
  }

  setVolume(volume: number): void {
    if (this.player) {
      this.player.volume = Math.min(Math.max(volume, 0), 1); // Clamp volume between 0 and 1
    } else {
      console.error('Player is not initialized.');
    }
  }
}
