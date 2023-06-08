import {rootReducer} from './root.reducer';
import {ActionType} from '../../types';
import {defaultState} from '../root.context';
import * as json from '../../data/payload.json';

describe('rootReducer', () => {
  it('should set gallery data', () => {
    const draft = defaultState;

    const action = {
      type: ActionType.SET_DATA,
      payload: json.data,
    };
    const nextState = rootReducer(draft, action);

    expect(nextState.data).toHaveLength(110);
  });

  it('should set active image index', () => {
    const draft = {
      ...defaultState,
      data: json.data,
    };

    const action = {
      type: ActionType.SET_ACTIVE_IMAGE_INDEX,
      payload: 1,
    };
    const nextState = rootReducer(draft, action);

    expect(nextState.activeImageIndex).toEqual(1);
  });

  it('should change text', () => {
    const draft = defaultState;

    const action = {
      type: ActionType.CHANGE_TEXT,
      payload: 'Test',
    };

    const nextState = rootReducer(draft, action);

    expect(nextState.activeComment).toEqual('Test');
  });

  it('should collapse preview', () => {
    const draft = defaultState;

    const action = {
      type: ActionType.COLLAPSE_PREVIEW,
    };

    const nextState = rootReducer(draft, action);

    expect(nextState.previewVisible).toBeFalsy();
  });

  it('should add comment', () => {
    const draft = {
      ...defaultState,
      data: json.data,
      activeImageIndex: 1,
      activeComment: 'Test',
    };

    const action = {
      type: ActionType.ADD_COMMENT,
    };

    const nextState = rootReducer(draft, action);

    expect(nextState.data[1].comments).toHaveLength(1);
    expect(nextState.data[1].comments[0].text).toEqual('Test');
  });

  it('should delete comment', () => {
    const draft = {
      ...defaultState,
      data: json.data,
      activeImageIndex: 1,
      activeComment: 'Test',
    };

    const action = {
      type: ActionType.DELETE_COMMENT,
      payload: 1,
    };

    const nextState = rootReducer(draft, action);

    expect(nextState.data[1].comments).toHaveLength(0);
  });

  it('should edit comment', () => {
    const draft = {
      ...defaultState,
      data: json.data,
      activeImageIndex: 1,
      activeComment: 'Test',
    };

    const action = {
      type: ActionType.EDIT_COMMENT,
      payload: {index: 1},
    };

    const nextState = rootReducer(draft, action);

    expect(nextState.editting).toBeTruthy();
    expect(nextState.edittingIndex).toEqual(1);
  });

  it('should cancel edit comment', () => {
    const draft = {
      ...defaultState,
      data: json.data,
      activeImageIndex: 1,
      activeComment: 'Test',
      editting: true,
      edittingIndex: 1,
    };

    const action = {
      type: ActionType.CANCEL_EDIT_COMMENT,
    };

    const nextState = rootReducer(draft, action);

    expect(nextState.editting).toBeFalsy();
    expect(nextState.edittingIndex).toBe(0);
  });
});
