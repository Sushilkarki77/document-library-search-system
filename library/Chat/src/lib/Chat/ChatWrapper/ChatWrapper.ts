import { Component } from "@angular/core";
import { Chat } from "../Chat";



@Component({
    selector: 'lib-chat-wrapper',
    imports: [Chat],
    styles: `
     :host {
        display: block;
        height: 100%;
     }

     .chat-wrapper {
        display: block;
        height: 100%;
        padding: 2% 5% 2%;
     }

     lib-chat {
        background: white;
        box-shadow: var(--default-shadow);
        border-radius: 8px;
        max-width: 768px;
        margin: auto;
     }
    `,
    template: `<div class="chat-wrapper">
        <lib-chat></lib-chat>
    </div>`

})
export class ChatWrapper { }
