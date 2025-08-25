
import { Route } from '@angular/router';
import { Dashboard } from './lib/Dashboard/Dashboard'
import { Search } from './lib/Dashboard/search/search';
import { Documents } from './lib/Dashboard/documents/components/documents-wrapper/documents';


export const DashboardRoutes: Route[] = [
    {
        path: '', component: Dashboard, children: [
            { path: '', redirectTo: 'search', pathMatch: 'full', title: "Search" },
            { path: 'search', component: Search, title: "Search" },
            { path: 'documents', component: Documents, title: "Documents" }
        ]
    },
    { path: '**', redirectTo: 'search' }

];