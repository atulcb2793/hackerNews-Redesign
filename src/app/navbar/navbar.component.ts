import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() pageChange = new EventEmitter();
  constructor() {}

  currentPage: string;

  ngOnInit() {
    this.currentPage = 'Latest';
  }

  goToPageEvent(pageName) {
    this.currentPage = pageName === 'Latest' ? 'Top' : 'Latest';
    this.pageChange.emit(pageName);
  }
}
