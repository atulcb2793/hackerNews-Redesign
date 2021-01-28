import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BackendService } from '../shared/service/backend-data.service';
import { DebugElement } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Story } from '../modal/story';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let el: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPageComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component and call function on ngInit', () => {
    spyOn(component, 'getStoriesId');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.showSpinner).toBeTruthy();
    expect(component.getStoriesId).toHaveBeenCalledOnceWith('Top');
  });

  it('test goTpPage function which sets page change event value', () => {
    spyOn(component, 'getStoriesId');
    let page = 'Test';
    component.goToPage(page);
    fixture.detectChanges();
    expect(component.pageChangeEvent).toEqual(page);
    expect(component.getStoriesId).toHaveBeenCalledOnceWith(page);
  });

  it('test initialize function which resets variables', () => {
    component.initialize();
    fixture.detectChanges();
    expect(component.renderData.length).toEqual(0);
    expect(component.errorData).toEqual('');
  });

  it('test getStoriesId function ', fakeAsync(() => {
    let returnData = [1, 2, 3];
    spyOn(component, 'getStoryDetails');
    const service = el.injector.get(BackendService);
    spyOn(service, 'getStories').and.returnValue(of(returnData));
    component.getStoriesId('Top');
    fixture.detectChanges();
    tick();
    expect(component.storyKeys).toEqual(returnData);
    expect(component.totalStoryCount).toEqual(component.storyKeys.length);
    expect(component.getStoryDetails).toHaveBeenCalled();
  }));

  it('test getStoriesId function in case of error ', fakeAsync(() => {
    spyOn(component, 'getStoryDetails');
    spyOn(component, 'errorHandle');
    const service = el.injector.get(BackendService);
    spyOn(service, 'getStories').and.returnValue(throwError('Error'));
    component.getStoriesId('Top');
    fixture.detectChanges();
    tick();
    expect(component.getStoryDetails).not.toHaveBeenCalled();
    expect(component.errorHandle).toHaveBeenCalled();
  }));

  it('test renderDataByPageNum function ', () => {
    let paramObject = { pageNum: '10', itemsPerPage: '20' };
    spyOn(component, 'getStoryDetails');
    component.renderDataByPageNum(paramObject);
    fixture.detectChanges();
    expect(component.getStoryDetails).toHaveBeenCalledOnceWith(
      Number(paramObject.pageNum),
      Number(paramObject.itemsPerPage)
    );
  });

  it('test getStoryDetails function atlease one storykey retuned by backed ', fakeAsync(() => {
    let returnData: Story = { id: 123 };
    component.storyKeys = [1];
    spyOn(component, 'initialize');
    const service = el.injector.get(BackendService);
    spyOn(service, 'getStory').and.returnValue(of(returnData));
    component.getStoryDetails();
    fixture.detectChanges();
    tick();
    expect(component.initialize).toHaveBeenCalled();
    expect(component.renderData).not.toBeNull();
    expect(component.showSpinner).toBeFalsy();
  }));

  it('test getStoryDetails function if backed returns null -do not push to response array ', fakeAsync(() => {
    component.storyKeys = [1];
    let returnData: any = {};
    spyOn(component, 'initialize');
    const service = el.injector.get(BackendService);
    spyOn(service, 'getStory').and.returnValue(of(returnData));
    component.getStoryDetails();
    fixture.detectChanges();
    tick();
    expect(component.initialize).toHaveBeenCalled();
    expect(component.renderData).toEqual([]);
    expect(component.showSpinner).toBeFalsy();
  }));

  it('test getStoryDetails function with story key array empty ', fakeAsync(() => {
    component.storyKeys = [];
    component.getStoryDetails();
    fixture.detectChanges();
    tick();
    expect(component.renderData.length).toEqual(0);
    expect(component.showSpinner).toBeFalsy();
  }));

  it('test getStoryDetails function for error scenario ', fakeAsync(() => {
    component.storyKeys = [1];
    spyOn(component, 'errorHandle');
    const service = el.injector.get(BackendService);
    spyOn(service, 'getStory').and.returnValue(throwError('error'));
    component.getStoryDetails();
    fixture.detectChanges();
    tick();
    expect(component.errorHandle).toHaveBeenCalled();
    expect(component.showSpinner).toBeFalsy();
  }));

  it('test error handle function ', () => {
    spyOn(component, 'initialize');
    component.errorHandle('test error');
    fixture.detectChanges();
    expect(component.initialize).toHaveBeenCalled();
    expect(component.showSpinner).toBeFalsy();
    expect(component.errorData).toEqual('Something went wrong !!!');
  });

  it('test unsubscription of observables in ngOndestroy  ', () => {
    spyOn(component['subscriptions'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
  });

  //DOM TEST
  it('should display error message on screen in case of error', fakeAsync(() => {
    component.errorData = 'test';
    const errorComponentBeforeChange = el.nativeElement.querySelector('.error');
    expect(errorComponentBeforeChange).toBeNull();
    fixture.detectChanges();
    const errorComponent = el.nativeElement.querySelector('.error');
    expect(errorComponent).toBeDefined();
  }));
});
