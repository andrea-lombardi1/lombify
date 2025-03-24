import { computed, Injectable, signal } from '@angular/core';
import { ResultModel } from '../../model/search.model';

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
  private currentTimeTimeout: any = null;
  readonly #songInfo = signal<ResultModel | null>(null);
  readonly songInfoComp = computed(() => this.#songInfo());

  constructor() {}

  initializePlayer(song: ResultModel): void {
    // Set the song info
    this.#songInfo.set(song);
      if (
        this.#playerSignal() &&
        this.#playerSignal()!.src === song.previewUrl
      ) {
        return;
      } else {
        if (this.#playerSignal()) {
          this.#playerSignal()!.src = '';
          this.#playerSignal.update(() => new Audio(song.previewUrl));
        } else {
          this.#playerSignal.set(new Audio(song.previewUrl));
        }
      }
  }

  play(): void {
    if (this.#playerSignal()) {
      this.increaseVolumeAndPlay();
      clearTimeout(this.currentTimeTimeout);
      this.currentTimeTimeout = setTimeout(() => {
        this.decreaseVolumeAndPause();
      }, 29100 - this.#playerSignal()!.currentTime * 1000);
    } else {
      this.initializePlayer(this.#songInfo()!);
      this.play();
    }
  }

  pause(): void {
    if (this.#playerSignal()) {
      clearTimeout(this.currentTimeTimeout);
      this.decreaseVolumeAndPause();
    } else {
      this.initializePlayer(this.#songInfo()!);
      this.pause();
    }
  }

  stop(): void {
    if (this.#playerSignal()) {
      this.#playerSignal()!.pause();
      this.#playerSignal()!.currentTime = 0;
      this.updateCurrentTime(false);
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
