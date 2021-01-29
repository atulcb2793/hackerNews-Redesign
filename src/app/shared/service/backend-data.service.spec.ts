import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BackendService } from './backend-data.service';

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
  let mockService: BackendService;
  let httpTestingController: HttpTestingController;

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
    const page = 'Latest';
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
    const page = 'Top';
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
    const id = 123;
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
