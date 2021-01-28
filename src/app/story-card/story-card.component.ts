import { Component, Input, OnInit } from '@angular/core';
import { Story } from '../modal/story';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css'],
})
export class StoryCardComponent implements OnInit {
  @Input() cardData: Story;

  constructor() {}

  ngOnInit() {}
}
