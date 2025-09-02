
import { Route } from '@angular/router';
import { Dashboard } from './lib/Dashboard/Dashboard'
import { Search } from './lib/Dashboard/search/search';
import { Documents } from './lib/Dashboard/documents/components/documents-wrapper/documents';
import { Chat } from '@document-library-search-system/Chat'


export const DashboardRoutes: Route[] = [
    {
        path: '', component: Dashboard, children: [
            { path: '', redirectTo: 'documents', pathMatch: 'full' },
            { path: 'chat', loadChildren: () => import('@document-library-search-system/Chat').then(x => x.chatRoutes) },
            { path: 'search', component: Search, title: "Search" },
            { path: 'documents', component: Documents, title: "Documents" }
        ]
    },
    { path: '**', redirectTo: 'documents' }

];