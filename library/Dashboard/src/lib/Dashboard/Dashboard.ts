import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '@document-library-search-system/Common';



@Component({
  selector: 'lib-dashboard',
  imports: [MatToolbarModule, MatButtonModule, RouterModule, MatButtonModule, MatMenuModule],
  templateUrl: './Dashboard.html',
  styleUrl: './Dashboard.css',
})
export class Dashboard {
  authService = inject(AuthService);
}
