import { CustomTimeagoPipe } from './timeago.pipe';

describe('TimeagoPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomTimeagoPipe();
    expect(pipe).toBeTruthy();
  });
});
