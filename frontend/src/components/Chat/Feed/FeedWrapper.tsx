import { Flex } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';

interface FeedsWrapperProps {
  session: Session;
}

const FeedsWrapper: React.FC<FeedsWrapperProps> = ({ session }) => {
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <Flex
      width="100%"
      direction="column"
      display={{ base: conversationId ? 'flex' : 'none', md: 'flex' }}
    >
      {conversationId ? (
        <Flex> {conversationId} </Flex>
      ) : (
        <div>No conversation selected</div>
      )}
    </Flex>
  );
};

export default FeedsWrapper;
