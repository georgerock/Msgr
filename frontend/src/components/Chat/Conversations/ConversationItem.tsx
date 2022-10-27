/*eslint-env browser */

import { Stack, Text } from '@chakra-ui/react';
import { ConversationPopulated } from '../../../../../backend/src/util/types';

interface ConversationItemProps {
  conversation: ConversationPopulated;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
}) => {
  return (
    <Stack p={4} _hover={{ bg: 'whiteAlpha.200' }} borderRadius={4}>
      <Text>{conversation.id}</Text>
    </Stack>
  );
};
