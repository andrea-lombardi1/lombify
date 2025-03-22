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
      // Get the length of the audio file
      this.player.onloadedmetadata = () => {
        console.log('Audio duration:', this.player?.duration);
      };
    } else if (fileExtension === 'm4v') {
      this.player = document.createElement('video');
      this.player.src = fileUrl;
    } else {
      throw new Error('Unsupported file format. Only .m4a and .m4v are supported.');
    }
  }

  play(): void {
    if (this.player) {
      // Get the timestamp when the audio resumes playing
      console.log('Audio resume time:', this.player.currentTime);

      this.increaseVolumeAndPlay();
      setTimeout(() => {
        this.decreaseVolumeAndPause();
      }, 29000 - (this.player.currentTime * 1000));
    } else {
      console.error('Player is not initialized.');
    }
  }

  pause(): void {
    if (this.player) {
      this.decreaseVolumeAndPause();
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

  increaseVolumeAndPlay(): void {
    if (this.player) {
      this.player.play();
      this.player.volume = 0;
      const fadeInInterval = setInterval(() => {
        if (this.player) {
          this.player.volume = Math.min(this.player.volume + 0.1, 1);
          if (this.player.volume === 1) {
            clearInterval(fadeInInterval);
          }
        } else {
          console.error('Player is not initialized.');
          clearInterval(fadeInInterval);
        }
      }, 100);
    } else {
      console.error('Player is not initialized.');
    }
  }

  decreaseVolumeAndPause(): void {
    if (this.player) {
      const fadeOutInterval = setInterval(() => {
        if (this.player) {
          this.player.volume = Math.max(this.player.volume - 0.1, 0);
          if (this.player.volume === 0) {
            this.player.pause();
            clearInterval(fadeOutInterval);
          }
        } else {
          console.error('Player is not initialized.');
          clearInterval(fadeOutInterval);
        }
      }, 100);
    } else {
      console.error('Player is not initialized.');
    }
  }
}
