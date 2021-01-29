import { Pipe, PipeTransform } from '@angular/core';
import { piepConstants } from '../../config/App-Constants';

@Pipe({
  name: 'timeago',
  pure: true,
})
export class CustomTimeagoPipe implements PipeTransform {
  transform(value: any): any {
    const timeNow = Math.round(new Date().getTime() / piepConstants.UNIXTIME);
    const timeDiff = (timeNow - value) / piepConstants.HOURMINUTES;
    if (timeDiff < piepConstants.HOURMINUTES) {
      return `${Math.floor(timeDiff)} minutes ago`;
    } else if (
      timeDiff >= piepConstants.HOURMINUTES &&
      timeDiff < piepConstants.DAYMINUTES
    ) {
      return `${Math.floor(timeDiff / piepConstants.HOURMINUTES)} hours ago`;
    } else if (
      timeDiff >= piepConstants.DAYMINUTES &&
      timeDiff < piepConstants.MONTHMINUTES
    ) {
      return `${Math.floor(timeDiff / piepConstants.DAYMINUTES)} days ago`;
    } else if (
      timeDiff >= piepConstants.MONTHMINUTES &&
      timeDiff < piepConstants.YEARMINUTES
    ) {
      return `${Math.floor(timeDiff / piepConstants.MONTHMINUTES)} months ago`;
    }
    return `${Math.floor(timeDiff / piepConstants.YEARMINUTES)} years ago`;
  }
}
