import {produce} from 'immer';
import {RootState, RootAction, ActionType} from '../../types';
import {getNextId} from '../../utils';

export const rootReducer = (
  state: RootState,
  action: RootAction<ActionType>,
) => {
  switch (action.type) {
    case ActionType.SET_DATA:
      return produce(state, draft => {
        draft.previewVisible = false;
        draft.activeImageIndex = 0;
        draft.editting = false;
        draft.activeComment = '';
        draft.data = action.payload;
      });
    case ActionType.SET_ACTIVE_IMAGE_INDEX:
      return produce(state, draft => {
        draft.activeImageIndex = action.payload;
        draft.previewVisible = true;
      });
    case ActionType.CHANGE_TEXT:
      return produce(state, draft => {
        draft.activeComment = action.payload;
      });
    case ActionType.COLLAPSE_PREVIEW:
      return produce(state, draft => {
        draft.previewVisible = false;
        draft.activeImageIndex = 0;
        draft.activeComment = '';
      });
    case ActionType.ADD_COMMENT:
      return produce(state, draft => {
        if (draft.editting) {
          const comment = draft.data[draft.activeImageIndex].comments.find(
            item => item.id === draft.edittingIndex,
          );
          if (comment) {
            comment.text = draft.activeComment;
            draft.editting = false;
            draft.activeComment = '';
            return;
          }
        }
        draft.data[draft.activeImageIndex].comments.push({
          id: getNextId(draft.data[draft.activeImageIndex].comments),
          text: draft.activeComment,
        });
        draft.activeComment = '';
      });
    case ActionType.DELETE_COMMENT:
      return produce(state, draft => {
        draft.data[draft.activeImageIndex].comments = draft.data[
          draft.activeImageIndex
        ].comments.filter(comment => comment.id !== action.payload);
        if (draft.editting) {
          draft.activeComment = '';
        }
        draft.editting = false;
        draft.edittingIndex = 0;
      });
    case ActionType.EDIT_COMMENT:
      return produce(state, draft => {
        const {index} = action.payload;
        const comment = draft.data[draft.activeImageIndex].comments.find(
          item => item.id === index,
        );

        draft.activeComment = comment?.text || '';
        draft.edittingIndex = index;
        draft.editting = true;
      });
    case ActionType.CANCEL_EDIT_COMMENT:
      return produce(state, draft => {
        draft.editting = false;
        draft.activeComment = '';
        draft.edittingIndex = 0;
      });
    default:
      return state;
  }
};
