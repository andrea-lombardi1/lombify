import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private player: HTMLAudioElement | HTMLVideoElement | null = null;
  readonly #playerSignal = signal<HTMLAudioElement | HTMLVideoElement | null>(
    null
  );
  readonly playerComp = computed(() => this.#playerSignal());
  readonly #currentTime = signal<number>(0);
  readonly currentTimeComp = computed(() => this.#currentTime());
  private currentTimeInterval: any = null;
  readonly #playerState = signal<boolean>(false);
  readonly playerStateComp = computed(() => this.#playerState());

  constructor() {}

  initializePlayer(fileUrl: string): void {
    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
    if (fileExtension === 'm4a') {
      this.#playerSignal.set(new Audio(fileUrl));
    } else if (fileExtension === 'm4v') {
      this.player = document.createElement('video');
      this.player.src = fileUrl;
    } else {
      throw new Error(
        'Unsupported file format. Only .m4a and .m4v are supported.'
      );
    }
  }

  play(): void {
    if (this.#playerSignal()) {
      this.increaseVolumeAndPlay();
      setTimeout(() => {
        this.decreaseVolumeAndPause();
      }, 29000 - (this.#playerSignal()?.currentTime ?? 0) * 1000);
    } else {
      console.error('Player is not initialized.');
    }
  }

  pause(): void {
    if (this.#playerSignal()) {
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
    if (this.#playerSignal()) {
      this.#playerState.set(true);
      this.#playerSignal()!.play();
      this.updateCurrentTime(true);
      this.#playerSignal()!.volume = 0;
      const fadeInInterval = setInterval(() => {
        this.#playerSignal()!.volume = Math.min(
          this.#playerSignal()!.volume + 0.1,
          1
        );
        if (this.#playerSignal()!.volume === 1) {
          clearInterval(fadeInInterval);
        }
      }, 100);
    } else {
      console.error('Player is not initialized.');
    }
  }

  decreaseVolumeAndPause(): void {
    if (this.#playerSignal()) {
      const fadeOutInterval = setInterval(() => {
        this.#playerSignal()!.volume = Math.max(
          this.#playerSignal()!.volume - 0.1,
          0
        );
        if (this.#playerSignal()!.volume === 0) {
          this.#playerState.set(false);
          this.updateCurrentTime(false);
          this.#playerSignal()!.pause();

          // Stop updating currentTime
          if (this.currentTimeInterval) {
            clearInterval(this.currentTimeInterval);
            this.currentTimeInterval = null;
          }
          clearInterval(fadeOutInterval);
        }
      }, 100);
    } else {
      console.error('Player is not initialized.');
    }
  }

  updateCurrentTime(play: boolean): void {
    if (play) {
      this.currentTimeInterval = setInterval(() => {
        if (this.#playerSignal()) {
          this.#currentTime.set(this.#playerSignal()!.currentTime);
        }
      }, 50);
    } else {
      if (this.currentTimeInterval) {
        clearInterval(this.currentTimeInterval);
        this.currentTimeInterval = null;
      }
    }
  }
}
