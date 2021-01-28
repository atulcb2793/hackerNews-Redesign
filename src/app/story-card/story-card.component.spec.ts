import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomTimeagoPipe } from '../shared/pipe/timeago.pipe';

import { StoryCardComponent } from './story-card.component';
import { Story } from '../modal/story';
import { DebugElement } from '@angular/core';

describe('StoryCardComponent', () => {
  let component: StoryCardComponent;
  let fixture: ComponentFixture<StoryCardComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoryCardComponent, CustomTimeagoPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component ', () => {
    expect(component).toBeTruthy();
  });

  it('should reder the card with details on screen whent there is cardData ', () => {
    let testCardObject: Story = {
      id: 1232,
      url: 'testURL',
      by: 'testUser',
      title: 'I am test',
      score: 10,
      time: 160000000,
      descendants: 10,
    };

    const url = el.nativeElement.querySelector('a');
    const title = el.nativeElement.querySelector('h5');
    const score = el.nativeElement.querySelector(
      '.card-text:nth-child(1) small:first-child'
    );
    const user = el.nativeElement.querySelector('#userName');
    const time = el.nativeElement.querySelector(
      '.card-text:nth-child(2) small:nth-child(2)'
    );

    component.cardData = testCardObject;
    fixture.detectChanges();

    const comments = el.nativeElement.querySelector(
      '.card-text:nth-child(3) small:nth-child(2)'
    ).textContent;
    expect(url.href).not.toBeFalsy();
    expect(title.textContent).not.toBeFalsy();
    expect(score.textContent).not.toBeFalsy();
    expect(user.textContent).not.toBeFalsy();
    expect(time.textContent).not.toBeFalsy();
    expect(comments).not.toBeNull();
    expect(comments).toEqual('Comments');
  });

  it('should reder the discuss option rather than comment when comment count is 0', () => {
    let testCardObject: Story = {
      id: 123,
      descendants: 0,
    };

    component.cardData = testCardObject;
    fixture.detectChanges();

    const ele = el.nativeElement.querySelector('.card-text:nth-child(3)');
    expect(ele).not.toBeNull();
    expect(ele.textContent).toEqual('Discuss');
  });
});
