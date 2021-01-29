import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackendService } from '../shared/service/backend-data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  constructor(private backendService: BackendService) {}
  totalStoryCount;
  storyKeys;
  renderData = [];
  pageChangeEvent;
  showSpinner: boolean;
  errorData: string;
  subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.showSpinner = true;
    this.getStoriesId('Top');
  }

  goToPage(page) {
    this.pageChangeEvent = page;
    this.getStoriesId(page);
  }

  initialize() {
    this.renderData = [];
    this.errorData = '';
  }

  getStoriesId(page) {
    this.subscriptions.add(
      this.backendService.getStories(page).subscribe(
        (data) => {
          this.storyKeys = data;
          this.totalStoryCount = this.storyKeys.length;
          this.getStoryDetails();
        },
        (error) => {
          this.errorHandle(error);
        }
      )
    );
  }

  renderDataByPageNum(paginationDetails) {
    this.getStoryDetails(
      Number(paginationDetails.pageNum),
      Number(paginationDetails.itemsPerPage)
    );
  }

  getStoryDetails(page = 0, items = 12) {
    this.showSpinner = true;
    this.initialize();
    let startCount = page * items;
    const endCount = startCount + items;
    if (this.storyKeys.length > 0) {
      while (startCount !== endCount) {
        this.subscriptions.add(
          this.backendService.getStory(this.storyKeys[startCount]).subscribe(
            (res) => {
              if (res && Object.keys(res).length > 0) {
                this.renderData.push(res);
              }
            },
            (error) => {
              this.errorHandle(error);
            }
          )
        );
        startCount++;
      }
    }
    this.showSpinner = false;
  }

  errorHandle(error) {
    this.initialize();
    this.showSpinner = false;
    this.errorData = 'Something went wrong !!!';
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
