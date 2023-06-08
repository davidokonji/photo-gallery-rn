export interface DarkProps {
  isDark?: boolean;
}

export interface Comment {
  id: number;
  text: string;
}

export interface Payload {
  id: number;
  src: string;
  comments: Comment[];
}

export interface RootState {
  activeImageIndex: number;
  previewVisible: boolean;
  editting?: boolean;
  edittingIndex?: number;
  activeComment: string;
  data: Payload[];
}

export enum ActionType {
  SET_DATA = 'SET_DATA',
  CHANGE_TEXT = 'CHANGE_TEXT',
  SET_ACTIVE_IMAGE_INDEX = 'SET_ACTIVE_IMAGE_INDEX',
  COLLAPSE_PREVIEW = 'COLLAPSE_PREVIEW',
  ADD_COMMENT = 'ADD_COMMENT',
  DELETE_COMMENT = 'DELETE_COMMENT',
  EDIT_COMMENT = 'EDIT_COMMENT',
  CANCEL_EDIT_COMMENT = 'CANCEL_EDIT_COMMENT',
}

export interface RootAction<T> {
  type: T;
  payload?: any;
}

export interface LayoutProps {
  width?: string;
  padding?: string;
  margin?: string;
  radius?: string;
  border?: string;
  bgColor?: string;
}
