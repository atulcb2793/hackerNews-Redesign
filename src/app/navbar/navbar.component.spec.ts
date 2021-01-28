import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component and set property on ngInit', () => {
    expect(component).toBeTruthy();
    expect(component.currentPage).toEqual('Latest');
  });

  it('should emit the event with pageName as Top when clicked on Latest option', () => {
    component.goToPageEvent('Latest');
    expect(component.currentPage).toBe('Top');
    component.pageChange.subscribe((data) =>
      expect(data).toBe(component.currentPage)
    );
  });

  it('should emit the event with pageName as Latest when clicked on Top option', () => {
    component.goToPageEvent('Top');
    expect(component.currentPage).toBe('Latest');
    component.pageChange.subscribe((data) =>
      expect(data).toBe(component.currentPage)
    );
  });

  //DOM AND EVENT TESTING
  it('check for DOM rendering upon component creation (Header and buttons are present)', () => {
    const header = el.query(By.css('.header'));
    const loginButton = el.nativeElement.querySelector('#loginButton');
    const searchButton = el.nativeElement.querySelector('#searchButton');
    expect(header).toBeTruthy('Header is not present');
    expect(loginButton).toBeTruthy('loginButton is not present');
    expect(searchButton).toBeTruthy('searchButton is not present');
  });

  it('check for click event on DOM. Changes Latest option to Top upon click on Latest option ', fakeAsync(() => {
    spyOn(component, 'goToPageEvent');
    const switchLink = el.nativeElement.querySelector('.switch-posts');
    switchLink.click();
    tick();
    expect(component.goToPageEvent).toHaveBeenCalledWith('Latest');
  }));

  it('check for click event on DOM. Changes Top option to Latest upon click on Top option ', fakeAsync(() => {
    component.currentPage = 'Top';
    spyOn(component, 'goToPageEvent');
    const switchLink = el.nativeElement.querySelector('.switch-posts');
    switchLink.click();
    tick();
    expect(component.goToPageEvent).toHaveBeenCalledWith('Top');
  }));
});
