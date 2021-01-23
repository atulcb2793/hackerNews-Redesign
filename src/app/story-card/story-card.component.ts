import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css'],
})
export class StoryCardComponent implements OnInit {
  @Input()
  cardData;

  constructor() {}

  ngOnInit() {}

  getUserData(user) {
    // TO DO get user data and display on modal
    console.log(user);
  }
}
