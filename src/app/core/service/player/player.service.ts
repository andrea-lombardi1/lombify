import { computed, Injectable, signal } from '@angular/core';
import { ResultModel } from '../../model/search.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  readonly #playerSignal = signal<HTMLAudioElement | HTMLVideoElement | null>(
    null
  );
  readonly playerComp = computed(() => this.#playerSignal());
  readonly #currentTime = signal<number>(0);
  readonly currentTimeComp = computed(() => this.#currentTime());
  private currentTimeInterval: any = null;
  private currentTimeTimeout: any = null;
  private fadeInInterval: any = null;
  private fadeOutInterval: any = null;
  readonly #songInfo = signal<ResultModel | null>(null);
  readonly songInfoComp = computed(() => this.#songInfo());

  constructor() {}

  initializePlayer(song: ResultModel): void {
    if (this.songInfoComp()?.previewUrl !== song.previewUrl) {
      // Set the song info
      this.#songInfo.set(song);
      if (this.#playerSignal()) {
        this.#playerSignal()!.src = '';
        this.#playerSignal.update(() => new Audio(song.previewUrl));
      } else {
        this.#playerSignal.set(new Audio(song.previewUrl));
      }
    }
  }

  play(song?: ResultModel): void {
    if (song) {
      if (this.songInfoComp()?.previewUrl !== song.previewUrl) {
        this.initializePlayer(song);
        this.play();
        return;
      }
    } else {
      this.increaseVolumeAndPlay();
      this.startCurrentTimeTimeout();
    }
  }

  startCurrentTimeTimeout(): void {
    if (Number.isNaN(this.#playerSignal()!.duration)) {
      return;
    }
    clearTimeout(this.currentTimeTimeout);
    this.currentTimeTimeout = setTimeout(() => {
      this.decreaseVolumeAndPause();
    }, this.#playerSignal()!.duration * 1000 - 800 - this.#playerSignal()!.currentTime * 1000);
  }


  pause(): void {
    clearTimeout(this.currentTimeTimeout);
    this.decreaseVolumeAndPause();
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

  increaseVolumeAndPlay(): void {
    console.log('Increasing volume and playing...');
    console.log(this.#playerSignal()!.volume);

    this.#playerSignal()!.play();
    this.updateCurrentTime(true);
    this.#playerSignal()!.volume = 0;
    clearInterval(this.fadeInInterval);
    clearInterval(this.fadeOutInterval);
    this.fadeInInterval = setInterval(() => {
      this.#playerSignal()!.volume = Math.min(
        this.#playerSignal()!.volume + 0.1,
        1
      );
      if (this.#playerSignal()!.volume === 1) {
        clearInterval(this.fadeInInterval);
      }
    }, 100);
  }

  decreaseVolumeAndPause(): void {
    console.log('Decreasing volume and pausing...');
    console.log(this.#playerSignal()!.volume);
    clearInterval(this.fadeInInterval);
    clearInterval(this.fadeOutInterval);
    this.fadeOutInterval = setInterval(() => {
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
        clearInterval(this.fadeOutInterval);
      }
    }, 100);
  }

  updateCurrentTime(play: boolean): void {
    if (play) {
      clearInterval(this.currentTimeInterval);
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
