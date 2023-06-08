import React, {useRef} from 'react';
import {Modal, Keyboard} from 'react-native';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Image from '../../atoms/Image';
import Input from '../../atoms/Input';
import {useRootContext} from '../../../context/root.context';
import {Comments} from '../Comments';
import Flex from '../../habitats/Flex';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import {colors} from '../../../theme';
import Icon from '../../atoms/Icon';

const StyledContainer = styled(KeyboardAwareScrollView)`
  flex: 1;
`;

const StyledInputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 18px 14px 0;
  width: 100%;
  postion: absolute;
  bottom: 0;
`;

const StyledButton = styled(Button)`
  border: 1px solid;
  padding: 12px 10px;
  border-radius: 16px;
  margin-left: 8px;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
`;

const CancelButton = styled(Button)`
  padding: 12px 10px;
`;

const BackButton = styled.Pressable`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
`;

const ImageContext = () => {
  const scrollViewRef: React.RefObject<KeyboardAwareScrollView> = useRef(null);
  const {addComment, state, collapsePreview, handleChangeText, cancelEditting} =
    useRootContext();

  const handleAddComment = () => {
    scrollViewRef.current?.scrollToEnd(true);
    addComment();
    Keyboard.dismiss();
  };

  const uri = state.data[state.activeImageIndex]?.src || '';

  return (
    <Modal
      animationType="slide"
      visible={state.previewVisible}
      presentationStyle="formSheet"
      onRequestClose={collapsePreview}>
      <>
        <BackButton onPress={collapsePreview}>
          <Icon name="Back" width={24} height={24} fill={colors.black} />
        </BackButton>

        <StyledContainer
          ref={scrollViewRef}
          onScrollEndDrag={event => {
            if (event.nativeEvent.contentOffset.y < 0) {
              collapsePreview();
            }
          }}
          enableOnAndroid
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <Flex>
            <Image uri={uri} resize={false} />
            <StyledInputContainer>
              <Input
                placeholder="Add a comment..."
                value={state.activeComment}
                onChangeText={handleChangeText}
              />
              <StyledButton
                disabled={!state.activeComment.trim().length}
                onPress={handleAddComment}>
                <Text>{state.editting ? 'Edit' : 'Post'}</Text>
              </StyledButton>
            </StyledInputContainer>
            {state.editting && (
              <CancelButton
                width="100%"
                onPress={cancelEditting}
                text={{
                  align: 'right',
                  decoration: 'underline',
                  size: 'extraSmall',
                }}>
                cancel editting
              </CancelButton>
            )}
            <Comments />
          </Flex>
        </StyledContainer>
      </>
    </Modal>
  );
};

export default ImageContext;
