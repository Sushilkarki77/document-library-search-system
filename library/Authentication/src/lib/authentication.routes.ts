
import { Route } from '@angular/router';
import { Login } from './Login/login';
import { Register } from './Register/Register';


export const AuthenticationRoutes: Route[] = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  { path: '**', redirectTo: 'login' }
];