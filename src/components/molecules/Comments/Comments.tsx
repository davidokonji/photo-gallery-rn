import React from 'react';
import styled from 'styled-components/native';
import {useColorScheme} from 'react-native';

import {useRootContext} from '../../../context/root.context';
import Flex from '../../habitats/Flex';
import Button from '../../atoms/Button';
import {colors} from '../../../theme';
import Text from '../../atoms/Text';
import {DarkProps} from '../../../types';

const StyledContainer = styled.View`
  flex: 1;
  padding: 18px 16px;
  margin-bottom: 32px;
`;

const StyledComment = styled.View<DarkProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  background-color: ${({isDark}) => (isDark ? colors.black : colors.drakGray)};
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 12px 10px;
`;

const Comments = () => {
  const isDark = useColorScheme() === 'dark';
  const {state, deleteComment, editComment} = useRootContext();

  const comments = state.data[state.activeImageIndex].comments || [];

  return (
    <StyledContainer>
      {comments.map(comment => (
        <StyledComment key={comment.id}>
          <Text width="78%">{comment.text}</Text>
          <Flex
            flexDirection="row"
            align="baseline"
            justify="space-between"
            bgColor={isDark ? colors.drakGray : colors.drakGray}
            width="20%">
            <Button
              text={{size: 'extraSmall', color: colors.black}}
              onPress={() => editComment(comment.id)}
              bgColor={isDark ? colors.drakGray : 'transparent'}>
              Edit
            </Button>
            <Button
              text={{size: 'extraSmall', color: colors.red}}
              onPress={() => deleteComment(comment.id)}
              bgColor={isDark ? colors.drakGray : 'transparent'}>
              Delete
            </Button>
          </Flex>
        </StyledComment>
      ))}
    </StyledContainer>
  );
};

export default Comments;
