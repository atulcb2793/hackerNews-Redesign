import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StoryCardComponent } from './story-card/story-card.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AppRoutingModule } from './app-routing.module';
import { PaginationComponent } from './pagination/pagination.component';
import { CustomTimeagoPipe } from './shared/pipe/timeago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    StoryCardComponent,
    FooterComponent,
    SpinnerComponent,
    PaginationComponent,
    CustomTimeagoPipe,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
