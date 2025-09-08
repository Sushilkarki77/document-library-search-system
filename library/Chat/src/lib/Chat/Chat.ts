import { Component, model } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface ChatObject {
  text: string,
  type: 'Question' | 'Answer';
}


@Component({
  selector: 'lib-chat',
  imports: [MatIcon, MatIconButton, MatProgressBarModule],
  templateUrl: './Chat.html',
  styleUrl: './Chat.css',
})
export class Chat {

  state: 'Loading' | 'Loaded' = 'Loaded';

  chats: ChatObject[] = [
    { text: 'This is question', type: 'Question' },
    { text: 'This is answer', type: 'Answer' }
  ];

  chatInpput = model('');

  chatInputChange = (chatText: string) => {
    this.chatInpput.set(chatText)
  }

  onEnterPressed = () => {
    this.chats.push({ text: this.chatInpput(), type: 'Question' });
    this.chatInpput.set("");
  }
}
