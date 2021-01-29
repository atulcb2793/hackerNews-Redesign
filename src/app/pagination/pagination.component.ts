import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { pagination } from '../config/App-Constants';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges, OnInit {
  @Input() storyCount: any;
  @Input() pageChange: any;
  @Output() renderData = new EventEmitter();
  paginationDetails: any = {};
  currentIndex;
  maxPages;
  pageArray = [];
  itemCount = pagination.DEFAULT_ITEMS_PER_PAGE;
  currentPages;
  pageCountArray = [];
  deafultItemsPerPage = pagination.DEFAULT_ITEMS_PER_PAGE;
  constructor() {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.currentPages = pagination.CURRENT_PAGES;
    this.currentIndex = 0;
    this.pageArray = [];
    this.pageCountArray = pagination.ITEMS_PER_PAGE_ARRAY;
  }

  ngOnChanges() {
    if (this.pageChange) {
      this.deafultItemsPerPage = pagination.DEFAULT_ITEMS_PER_PAGE;
      this.initialize();
    }
    if (this.storyCount) {
      this.setMaxPagesAndPageArray();
    }
  }

  updatePage(pageNum = 0, itemsPerPage = 12) {
    this.paginationDetails.pageNum = pageNum;
    this.paginationDetails.itemsPerPage = itemsPerPage;
    if (pageNum === 0) {
      this.initialize();
    }
    this.setMaxPagesAndPageArray(itemsPerPage);
    this.renderData.emit(this.paginationDetails);
  }

  setMaxPagesAndPageArray(items = 12) {
    this.maxPages = Math.ceil(this.storyCount / items) - 1;
    this.pageArray = Array.from({ length: this.maxPages }, (_, i) => i + 1);
  }

  updatePageNumber(flag) {
    if (flag === 'next') {
      if (this.currentIndex + 5 < this.maxPages) {
        this.currentIndex += 5;
      }

      this.currentPages = this.pageArray.slice(
        this.currentIndex,
        this.currentIndex + 5
      );
    } else {
      if (this.currentIndex === 0) {
        this.currentIndex = 5;
      }
      this.currentPages = this.pageArray.slice(
        this.currentIndex - 5,
        this.currentIndex
      );
      this.currentIndex -= 5;
    }
  }
}
