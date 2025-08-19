import { Route } from '@angular/router';


export const appRoutes: Route[] = [
    { path: 'auth', loadChildren: () => import('@document-library-search-system/Authentication').then(x => x.AuthenticationRoutes) },
    { path: 'dashboard', loadChildren: () => import('@document-library-search-system/Dashboard').then(x => x.Dashboard) },
    { path: '**', redirectTo: 'auth' }
];
