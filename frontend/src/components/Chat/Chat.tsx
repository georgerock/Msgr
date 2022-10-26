import { Flex } from '@chakra-ui/react';
import { Session } from 'next-auth';

import ConversationsWrapper from './Conversations/ConversationsWrapper';
import FeedsWrapper from './Feed/FeedWrapper';

interface IChatProps {
  session: Session;
}

const Chat: React.FC<IChatProps> = ({ session }) => {
  return (
    <Flex height="100vh">
      <ConversationsWrapper session={session} />
      <FeedsWrapper session={session} />
    </Flex>
  );
};

export default Chat;
