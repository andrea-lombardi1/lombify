import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { definePreset } from '@primeng/themes';

const Indigo = definePreset(Aura, {
  semantic: {
      primary: {
          50: '#e6f7ff',
          100: '#b3e5ff',
          200: '#80d4ff',
          300: '#4dc3ff',
          400: '#1ab2ff',
          500: '#00aaff',
          600: '#0099e6',
          700: '#0088cc',
          800: '#0077b3',
          900: '#006699',
          950: '#005580'
      }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Indigo,
        }
    })]
};
