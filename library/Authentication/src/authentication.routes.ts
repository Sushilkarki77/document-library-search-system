
import { Route } from '@angular/router';
import { Login } from './lib/Login/login';
import { Register } from './lib/Register/Register';


export const AuthenticationRoutes: Route[] = [
  {
    path: 'login',
    component: Login,
    title: 'Login'
  },
  {
    path: 'register',
    component: Register,
    title: 'Register'
  },
  // { path: '**', redirectTo: 'login' }
];