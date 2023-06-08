import {getNextId} from './index';
import {Comment} from '../types';

describe('getNextId', () => {
  it('should return 1 if there are no comments', () => {
    const comments: Comment[] = [];
    const result = getNextId(comments);
    expect(result).toBe(1);
  });

  it('should return next id when not an empty array', () => {
    const comments = [{id: 1, text: 'Hello'}];
    const result = getNextId(comments);
    expect(result).toBe(2);
  });
});
