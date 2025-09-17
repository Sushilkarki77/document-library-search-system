import { Component, ElementRef, inject, model, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Chatservice } from './services/chat.service';
import { SafeHTML } from './safe-html/safe-html';

interface ChatObject {
  text: string,
  type: 'Question' | 'Answer';
}


@Component({
  selector: 'lib-chat',
  imports: [MatIcon, MatIconButton, MatProgressBarModule, SafeHTML],
  templateUrl: './Chat.html',
  styleUrl: './Chat.css',
})
export class Chat {

  apiService = inject(Chatservice);

  @ViewChild('chatAnswerWrapper') chatAnswerWrapper!: ElementRef;


  state: 'Loading' | 'Loaded' = 'Loaded';

  chats: ChatObject[] = [
    // { text: 'This is question', type: 'Question' },
    // { text: 'This is answer', type: 'Answer' }
  ];

  chatInpput = model('');

  chatInputChange = (chatText: string) => {
    this.chatInpput.set(chatText)
  }

  onEnterPressed = () => {
    this.chats.push({ text: this.chatInpput(), type: 'Question' });
    this.state = 'Loading';
    this.scrolltoBottomOfthePage();
    this.apiService.chatExecute(this.chatInpput()).subscribe(res => {
      this.chats.push({ text: res.data.answer || 'Sorry could not generate answer!', type: 'Answer' })
      this.state = 'Loaded';
      this.scrolltoBottomOfthePage();
    });
    this.chatInpput.set("");
  }

  scrolltoBottomOfthePage = () => {
    setTimeout(() => {
      const div = this.chatAnswerWrapper.nativeElement;
      div.scrollTo({ top: div.scrollHeight, behavior: 'smooth' });
    }, 100);
  }
}
