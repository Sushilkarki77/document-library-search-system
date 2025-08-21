import { Route } from '@angular/router';
import { loggedInGuard, loggedOutGuard } from '@document-library-search-system/Common';


export const appRoutes: Route[] = [
    { path: 'auth', canActivate: [loggedOutGuard],  loadChildren: () => import('@document-library-search-system/Authentication').then(x => x.AuthenticationRoutes) },
    { path: 'dashboard', canActivate: [loggedInGuard], loadChildren: () => import('@document-library-search-system/Dashboard').then(x => x.DashboardRoutes) },
    { path: '**', redirectTo: 'dashboard' }
];
