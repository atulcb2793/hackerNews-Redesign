import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeago',
  pure: true,
})
export class CustomTimeagoPipe implements PipeTransform {
  transform(value: any): any {
    const timeNow = Math.round(new Date().getTime() / 1000.0);
    const timeDiff = (timeNow - value) / 60;
    if (timeDiff < 60) {
      return `${Math.floor(timeDiff)} minutes ago`;
    } else if (timeDiff >= 60 && timeDiff < 1440) {
      return `${Math.floor(timeDiff / 60)} hours ago`;
    } else if (timeDiff >= 1440 && timeDiff < 43200) {
      return `${Math.floor(timeDiff / 1440)} days ago`;
    } else if (timeDiff >= 43200 && timeDiff < 518400) {
      return `${Math.floor(timeDiff / 43200)} months ago`;
    }
    return `${Math.floor(timeDiff / 518400)} years ago`;
  }
}
