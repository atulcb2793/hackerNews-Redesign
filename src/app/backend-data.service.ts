import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Story } from './modal/story';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  baseUrl: string = `https://hacker-news.firebaseio.com/v0`;

  getStories(page) {
    let storyType = page === 'Latest' ? 'newstories' : 'topstories';
    return this.http.get(`${this.baseUrl}/${storyType}.json?print=pretty`);
  }

  getStory(id: number) {
    return this.http.get<Story>(`${this.baseUrl}/item/${id}.json?print=pretty`);
  }
}
