import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() pageChange = new EventEmitter();
  constructor() {}

  postState: string;

  ngOnInit() {
    this.postState = 'Latest';
  }

  goToPageEvent(pageName) {
    this.postState = pageName === 'Latest' ? 'Top' : 'Latest';
    this.pageChange.emit(pageName);
  }
}
