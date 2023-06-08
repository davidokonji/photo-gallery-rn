import {Comment} from '../types';

export const getNextId = (comments: Comment[]) => {
  const ids = comments.map(comment => comment.id);
  const index = ids.length === 0 ? 0 : Math.max(...ids);
  return index + 1;
};
