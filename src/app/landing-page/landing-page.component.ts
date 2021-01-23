import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackendService } from '../backend-data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  constructor(private backendService: BackendService) {}
  storyKeys;
  renderData = [];
  showSpinner: boolean = false;
  errorData: string;
  subscriptions: Subscription = new Subscription();

  ngOnInit() {
    this.showSpinner = true;
    this.goToPage();
  }

  goToPage(page = 'Latest') {
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
          this.getStoryDetails();
        },
        (error) => {
          this.errorHandle(error);
        }
      )
    );
  }

  getStoryDetails(page = 0, items = 12) {
    this.initialize();
    let startCount = page * items;
    let endCount = startCount + items;
    console.log('length', this.storyKeys.length);
    while (startCount !== endCount) {
      this.subscriptions.add(
        this.backendService.getStory(this.storyKeys[startCount]).subscribe(
          (res) => {
            this.renderData.push(res);
          },
          (error) => {
            this.errorHandle(error);
          }
        )
      );
      startCount++;
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
