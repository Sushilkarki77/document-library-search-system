import { CommonModule } from '@angular/common';
import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './services/search.service';
import { debounceTime, EMPTY, filter, map, Subject, switchMap } from 'rxjs';
import { SearchResponse } from './services/search.interface';
import { SearchItem } from './search-item/search-item';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DocumentsApiService } from '../documents/services/documents-api-service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SafeHTML } from '../documents/components/safe-html/safe-html';
import { DocViewer } from '../documents/components/doc-viewer/doc-viewer';
import { TypeaheadItem } from './typeahead-item/typeaheadItem';

@Component({
  selector: 'lib-search',
  imports: [FormsModule, MatIconButton, MatIcon, CommonModule, SafeHTML, MatProgressBarModule, MatPaginator, SearchItem, TypeaheadItem],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  pageSize = 10;

  searchQuery = signal<string>('');
  $searchResponse = signal<SearchResponse | null>(null);
  $searchState = signal<'before-start' | 'started' | 'completed' | 'failed'>('before-start');
  $pageIndex = signal<number>(0);

  route = inject(ActivatedRoute);
  router = inject(Router);
  searchService = inject(SearchService);
  documentAPIService = inject(DocumentsApiService);
  readonly dialog = inject(MatDialog);

  private search$ = new Subject<string>();

  typeaheadResults = signal<SearchResponse | null>(null);


  searchInputChange(text: string) {
    this.searchQuery.set(text);
  }

  inputChange = effect(() => {
    this.search$.next(this.searchQuery())
  });

  onSearch = () => {
    this.$pageIndex.set(0);
    this.updateQueryParam(this.searchQuery(), this.$pageIndex());
  };

  updateQueryParam(query: string, pageIndex: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query, pageIndex },
      queryParamsHandling: 'merge'
    });
  }

  constructor() {
    this.subscribeTOQueryParamChange();

    this.search$
      .pipe(
        debounceTime(200),
        map(value => value.trim()),
        switchMap(value => {
          if (!value) {
            this.typeaheadResults.set(null);
            return EMPTY;
          }
          return this.searchService.searchExecute(value, 0, 5).pipe(
            map(res => res.data)
          );
        })
      )
      .subscribe(value => {
        this.typeaheadResults.set(value);
      });
  }


  @HostListener('window:click', ['$event'])
  handleClick(event: MouseEvent) {

    if (event.target && this.hasSearchWrapper(event.target as HTMLElement)) {
      console.log('Click happened inside .search-input-wrapper');
    } else {
      this.typeaheadResults.set(null);
      console.log('Click happened outside');
    }
  }

  private hasSearchWrapper(el: HTMLElement | null): boolean {
    while (el) {
      if (el.classList && el.classList.contains('search-input-wrapper')) {
        return true;
      }
      el = el.parentElement;
    }
    return false;
  }


  subscribeTOQueryParamChange = () => {
    this.route.queryParams.pipe(
      filter(params => !!params['query']),
      switchMap(params => {
        this.searchQuery.set(params['query']);
        this.$searchState.set('started');
        const pageIndex = Number(params['pageIndex'] ?? 0);
        return this.searchService.searchExecute(params['query'], (pageIndex * this.pageSize), this.pageSize);
      })
    ).subscribe({
      next: (res) => {
        this.$searchState.set('completed');
        this.$searchResponse.set(res.data);
        this.typeaheadResults.set(null);
      },
      error: (e) => {
        console.log(e);
        this.$searchState.set('failed');
      }
    })
  }



  viewDocument = (_id: string) => {

    this.documentAPIService.getDownloadUrl(_id).subscribe(res => {
      if (window.innerWidth < 600) {
        window.open(res.data.downloadURL, '_blank');
      } else {
        this.openDialogDocViewer(res.data.downloadURL);
      }
    })
  }

  openDialogDocViewer = (url: string) => {
    this.dialog.open(DocViewer, {
      data: url,
      height: '100vh',
      width: '100vw',
      minWidth: '100vw',
      panelClass: 'doc-viewer-wrapper'
    });
  }

  handlePageEvent = (e: PageEvent) => {

    this.$pageIndex.set(e.pageIndex);
    this.updateQueryParam(this.searchQuery(), e.pageIndex);
  }

}
