import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'lib-chat',
  imports: [MatIcon, MatIconButton],
  templateUrl: './Chat.html',
  styleUrl: './Chat.css',
})
export class Chat {}
