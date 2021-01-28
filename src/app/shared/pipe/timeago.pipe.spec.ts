import { CustomTimeagoPipe } from './timeago.pipe';

let timeStamps = {
  minsAgo: Math.round(new Date().getTime() / 1000.0) - 120,
  hourAgo: Math.round(new Date().getTime() / 1000.0) - 60 * 60 * 2,
  daysAgo: Math.round(new Date().getTime() / 1000.0) - 60 * 60 * 25,
  monthsAgo: Math.round(new Date().getTime() / 1000.0) - 60 * 60 * 25 * 30,
  yearsAgo: Math.round(new Date().getTime() / 1000.0) - 60 * 60 * 25 * 30 * 12,
};
describe('TimeagoPipe', () => {
  const pipe = new CustomTimeagoPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return time ago in minutes', () => {
    expect(pipe.transform(timeStamps.minsAgo)).toContain('minutes ago');
  });

  it('should return time ago in hours', () => {
    expect(pipe.transform(timeStamps.hourAgo)).toContain('hours ago');
  });

  it('should return time ago in days', () => {
    expect(pipe.transform(timeStamps.daysAgo)).toContain('days ago');
  });

  it('should return time ago in months', () => {
    expect(pipe.transform(timeStamps.monthsAgo)).toContain('months ago');
  });

  it('should return time ago in years', () => {
    expect(pipe.transform(timeStamps.yearsAgo)).toContain('years ago');
  });
});
