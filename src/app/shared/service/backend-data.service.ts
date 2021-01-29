import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appsettings } from '../../config/App-Constants';
import { Story } from '../../modal/story';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}
  baseUrl: string = appsettings.BASE_URL;
  getStories(page) {
    const storyType = page === 'Latest' ? 'newstories' : 'topstories';
    return this.http.get(`${this.baseUrl}/${storyType}.json?print=pretty`);
  }

  getStory(id: number) {
    return this.http.get<Story>(`${this.baseUrl}/item/${id}.json?print=pretty`);
  }
}
