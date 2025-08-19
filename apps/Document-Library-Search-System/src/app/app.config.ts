import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { API_URL } from "@document-library-search-system/Common";
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
     { provide: API_URL, useValue: environment.api_url },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};
