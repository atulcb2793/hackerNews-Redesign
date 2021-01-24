import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input() storyCount: any;
  @Output() renderData = new EventEmitter();
  paginationDetails: any = {};
  currentIndex;
  maxPages;
  pageArray = [];
  currentPages;

  constructor() {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.currentPages = [1, 2, 3, 4, 5];
    this.currentIndex = 0;
  }

  ngOnChanges() {
    if (this.storyCount) {
      this.setMaxPagesAndPageArray();
    }
  }

  updatePage(pageNum = 0, itemsPerPage = 12) {
    this.paginationDetails.pageNum = pageNum;
    this.paginationDetails.itemsPerPage = itemsPerPage;
    if (pageNum === 0) this.initialize();
    this.setMaxPagesAndPageArray(itemsPerPage);
    this.renderData.emit(this.paginationDetails);
  }

  setMaxPagesAndPageArray(items = 12) {
    this.maxPages = Math.ceil(this.storyCount / items);
    this.pageArray = Array.from({ length: this.maxPages }, (_, i) => i + 1);
  }

  updatePageNumber(flag) {
    if (flag === 'next') {
      if (this.currentIndex + 5 < this.maxPages) this.currentIndex += 5;

      this.currentPages = this.pageArray.slice(
        this.currentIndex,
        this.currentIndex + 5
      );
    } else {
      if (this.currentIndex === 0) this.currentIndex = 5;
      this.currentPages = this.pageArray.slice(
        this.currentIndex - 5,
        this.currentIndex
      );
      this.currentIndex -= 5;
    }
  }
}
