import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { DebugElement } from '@angular/core';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component and set property on ngInit', () => {
    spyOn(component, 'initialize');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.initialize).toHaveBeenCalled();
    expect(component.currentIndex).toEqual(0);
    expect(component.currentPages.length).toEqual(5);
    expect(component.pageArray).toEqual([]);
    expect(component.pageCountArray.length).toEqual(5);
  });

  it('should call initialize functions inside ngOnchanges', () => {
    spyOn(component, 'initialize');
    spyOn(component, 'setMaxPagesAndPageArray');
    component.pageChange = 'Test';
    component.storyCount = undefined;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.initialize).toHaveBeenCalled();
    expect(component.deafultItemsPerPage).toEqual(12);
    expect(component.setMaxPagesAndPageArray).not.toHaveBeenCalled();
  });

  it('should call setMaxPagesAndPageArray functions inside ngOnchanges', () => {
    spyOn(component, 'initialize');
    spyOn(component, 'setMaxPagesAndPageArray');
    component.pageChange = undefined;
    component.storyCount = 10;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.initialize).not.toHaveBeenCalled();
    expect(component.setMaxPagesAndPageArray).toHaveBeenCalled();
  });

  it('should emit the event with paginarionDetails inside updatePage function', () => {
    let resObject = { pageNum: 5, itemsPerPage: 10 };
    spyOn(component, 'initialize');
    spyOn(component, 'setMaxPagesAndPageArray');

    component.updatePage(5, 10);
    fixture.detectChanges();
    expect(component.initialize).not.toHaveBeenCalled();
    expect(component.setMaxPagesAndPageArray).toHaveBeenCalledOnceWith(
      resObject.itemsPerPage
    );
    component.renderData.subscribe((data) => expect(data).toBe(resObject));
  });

  it('should call initialize inside updatePage function with default value', () => {
    spyOn(component, 'initialize');

    component.updatePage();
    fixture.detectChanges();
    expect(component.initialize).toHaveBeenCalled();
  });

  it('setMaxPagesAndPageArray should provide number of pages and create array with max page length', () => {
    //check for default parameter with items per page as 12
    component.storyCount = 25;
    component.setMaxPagesAndPageArray();
    fixture.detectChanges();
    expect(component.maxPages).toEqual(2);
    expect(component.pageArray.length).toEqual(2);

    //check for default parameter with items per page as 20
    component.storyCount = 40;
    component.setMaxPagesAndPageArray(20);
    fixture.detectChanges();
    expect(component.maxPages).toEqual(1);
    expect(component.pageArray.length).toEqual(1);
  });

  it('set currentPages array when moved to next page', () => {
    component.pageArray = new Array(10);
    component.maxPages = 10;
    component.currentIndex = 0;

    component.updatePageNumber('next');
    fixture.detectChanges();
    expect(component.currentPages.length).toEqual(5);
    expect(component.currentIndex).not.toBeFalsy();

    //if current index is non zero
    component.currentIndex = 7;
    component.updatePageNumber('next');
    fixture.detectChanges();
    expect(component.currentPages.length).toEqual(3);
  });

  it('set currentPages array to correct values when moved to previous page', () => {
    component.pageArray = new Array(10);
    component.maxPages = 10;
    component.currentIndex = 5;

    component.updatePageNumber('prev');
    fixture.detectChanges();
    expect(component.currentPages.length).toEqual(5);
    expect(component.currentIndex).toBeFalsy();

    //if current index is  zero
    component.currentIndex = 0;
    component.updatePageNumber('prev');
    fixture.detectChanges();
    expect(component.currentPages.length).toEqual(5);
    expect(component.currentIndex).toBeFalsy();
  });

  //DOM event and render tests

  it('should call updatePageNumber when clicked on >> arrow option ', fakeAsync(() => {
    spyOn(component, 'updatePageNumber');
    const goToNextSymbol = el.nativeElement.querySelector(
      'li:nth-last-child(2) a'
    );
    goToNextSymbol.click();
    tick();
    expect(component.updatePageNumber).toHaveBeenCalledOnceWith('next');
  }));

  it('should call updatePage when clicked on First option ', fakeAsync(() => {
    spyOn(component, 'updatePage');
    const first = el.nativeElement.querySelector('li:first-child a');
    first.click();
    tick();
    expect(component.updatePage).toHaveBeenCalled();
  }));

  it('should call updatePage when clicked on Last page option ', fakeAsync(() => {
    spyOn(component, 'updatePage');
    const last = el.nativeElement.querySelector('li:last-child a');
    last.click();
    tick();
    expect(component.updatePage).toHaveBeenCalled();
  }));

  it('should call updatePage when change on select dropdown ', fakeAsync(() => {
    spyOn(component, 'updatePage');
    const select = el.nativeElement.querySelector('select');
    select.dispatchEvent(new Event('change'));
    tick();
    expect(component.updatePage).toHaveBeenCalled();
  }));

  it('should call updatePageNumber when clicked on << arrow option ', fakeAsync(() => {
    spyOn(component, 'updatePageNumber');
    const goToPrevSymbol = el.nativeElement.querySelector('li:nth-child(2) a');
    goToPrevSymbol.click();
    tick();
    expect(component.updatePageNumber).toHaveBeenCalledOnceWith('prev');
  }));

  it('should call updatePageNumber when clicked on >> arrow option ', fakeAsync(() => {
    spyOn(component, 'updatePageNumber');
    const goToNextSymbol = el.nativeElement.querySelector(
      'li:nth-last-child(2) a'
    );
    goToNextSymbol.click();
    tick();
    expect(component.updatePageNumber).toHaveBeenCalledOnceWith('next');
  }));
});
