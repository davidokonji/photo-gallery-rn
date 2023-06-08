import React, {
  useReducer,
  useContext,
  PropsWithChildren,
  useEffect,
} from 'react';
import {createContext} from 'react';
import {useQuery} from '@tanstack/react-query';

import {RootState, ActionType} from '../types';
import {rootReducer} from './reducer/root.reducer';
import api from '../api';

export const defaultState: RootState = {
  activeImageIndex: 0,
  previewVisible: false,
  activeComment: '',
  data: [],
};

interface Context {
  state: RootState;
  setActiveIndex: (index: number) => void;
  addComment: (index?: number) => void;
  deleteComment: (index: number) => void;
  editComment: (index: number) => void;
  collapsePreview: () => void;
  handleChangeText: (text: string) => void;
  cancelEditting: () => void;
}

const RootContext = createContext<Context>({
  state: defaultState,
  setActiveIndex: () => {},
  addComment: () => {},
  deleteComment: () => {},
  editComment: () => {},
  collapsePreview: () => {},
  handleChangeText: () => {},
  cancelEditting: () => {},
});

interface RootProviderProps extends PropsWithChildren {
  initialState: RootState;
}

export const RootProvider = ({children, initialState}: RootProviderProps) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const {data} = useQuery({
    queryKey: ['gallery'],
    queryFn: () => api.fetchGallery(),
  });

  useEffect(() => {
    dispatch({
      type: ActionType.SET_DATA,
      payload: data,
    });
  }, [data]);

  const setActiveIndex = (index: number) => {
    dispatch({
      type: ActionType.SET_ACTIVE_IMAGE_INDEX,
      payload: index,
    });
  };

  const addComment = () => {
    dispatch({
      type: ActionType.ADD_COMMENT,
    });
  };

  const deleteComment = (index: number) => {
    dispatch({
      type: ActionType.DELETE_COMMENT,
      payload: index,
    });
  };

  const editComment = (index: number) => {
    dispatch({
      type: ActionType.EDIT_COMMENT,
      payload: {index},
    });
  };

  const handleChangeText = (text: string) => {
    dispatch({
      type: ActionType.CHANGE_TEXT,
      payload: text,
    });
  };

  const collapsePreview = () => {
    dispatch({
      type: ActionType.COLLAPSE_PREVIEW,
    });
  };

  const cancelEditting = () => {
    dispatch({
      type: ActionType.CANCEL_EDIT_COMMENT,
    });
  };

  return (
    <RootContext.Provider
      value={{
        state,
        setActiveIndex,
        addComment,
        deleteComment,
        editComment,
        collapsePreview,
        handleChangeText,
        cancelEditting,
      }}>
      {children}
    </RootContext.Provider>
  );
};

export const useRootContext = () => useContext(RootContext);
