import { Component, inject,  signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { SafePipePipe } from '../../pipes/safe-pipe-pipe';

const SCROLLBAR_WIDTH = window.innerWidth > 768 ? 17 : 0;
@Component({
  selector: 'lib-doc-viewer',
  imports: [CommonModule, SafePipePipe, MatIcon],
  templateUrl: './doc-viewer.html',
  styleUrl: './doc-viewer.css'
})
export class DocViewer {
  dialogRef = inject(MatDialogRef<DocViewer>);
  readonly pdfUrl = inject<string>(MAT_DIALOG_DATA);

  windowHeight = signal<string>((window.innerHeight - 48) + 'px');
  windowWidth = signal<string>((window.innerWidth - SCROLLBAR_WIDTH) + 'px');

  closeOverlay(): void {
    this.dialogRef.close();
  }
}
