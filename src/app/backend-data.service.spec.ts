import { BackendService } from './backend-data.service';

import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

const testStoryData = {
  id: 123,
  url: 'testURL',
  by: 'testUser',
  title: 'I am test',
  score: 10,
  time: 160000000,
  descendants: 10,
};

const testStoryIdArray = [1, 2, 3];

describe('BackendService', () => {
  let mockService: BackendService, httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackendService],
    });

    mockService = TestBed.inject(BackendService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getStories() should return array of story id for latest stories ', () => {
    let page = 'Latest';
    mockService.getStories(page).subscribe((res) => {
      expect(res).toEqual(testStoryIdArray);
    });
    const req = httpTestingController.expectOne(
      `${mockService.baseUrl}/newstories.json?print=pretty`
    );
    expect(req.request.method).toBe('GET');
    req.flush(testStoryIdArray);
  });

  it('getStories() should return array of story id for new stories ', () => {
    let page = 'Top';
    mockService.getStories(page).subscribe((res) => {
      expect(res).toEqual(testStoryIdArray);
    });
    const req = httpTestingController.expectOne(
      `${mockService.baseUrl}/topstories.json?print=pretty`
    );
    expect(req.request.method).toBe('GET');
    req.flush(testStoryIdArray);
  });

  it('getStory() should return story details for story id ', () => {
    let id = 123;
    mockService.getStory(id).subscribe((res) => {
      expect(res).toEqual(testStoryData);
    });
    const req = httpTestingController.expectOne(
      `${mockService.baseUrl}/item/${id}.json?print=pretty`
    );
    expect(req.request.method).toBe('GET');
    req.flush(testStoryData);
  });
});
