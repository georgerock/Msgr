import { Box } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { ConversationList } from './ConversationList';
import ConversationOperations from '../../../graphql/ops/conversation';
import { useQuery } from '@apollo/client';

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  const {
    data: convoData,
    error: convoErr,
    loading: convoLoading,
  } = useQuery(ConversationOperations.Queries.conevrsations);

  console.log('data ', convoData);

  return (
    <Box width={{ base: '100%', md: '400px' }} bg="whiteAlpha.50" py={6} px={3}>
      <ConversationList session={session} />
    </Box>
  );
};

export default ConversationsWrapper;
