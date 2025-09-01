import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation,  } from '@angular/router';
import { appRoutes } from './app.routes';
import { API_URL, AuthService, HttpInterceptor } from "@document-library-search-system/Common";
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const initializer = () => {
  const authService = inject(AuthService);
  try {
    const accesstoken = localStorage.getItem('access-token');
    const refreshtoken = localStorage.getItem('refresh-token');
    const user = localStorage.getItem('user');

    if (!accesstoken || !user || !refreshtoken) {
      authService.logout();
      return;
    }

    authService.userValue = JSON.parse(user);
    authService.accessTokenValue = accesstoken;
    authService.refreshTokenValue = refreshtoken;
  } catch (error) {
    console.log(error);
    authService.logout();
  }

}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(initializer),
    { provide: API_URL, useValue: environment.api_url },
    provideHttpClient(withInterceptorsFromDi()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withHashLocation()),
 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true
    }

  ],
};


