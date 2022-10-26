/*eslint-env browser */

import { useLazyQuery, useMutation } from '@apollo/client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import UserOps from '../../../../graphql/ops/user';
import ConvoOps from '../../../../graphql/ops/conversation';
import {
  SearchUsersData,
  SeachUsersInput,
  SearchedUser,
  CreateConversationData,
  CreateConversationInput,
} from '../../../../util/types';
import { Participants } from './Participants';
import { UserSearchList } from './UserSearchList';
import { Session } from 'next-auth';

interface ModalProps {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
}

export const ConversationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  session: {
    user: { id: me },
  },
}) => {
  const [username, setUsername] = useState('');
  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUsersData,
    SeachUsersInput
  >(UserOps.Queries.searchUsers);

  const [createConversation, { loading: convoLoading }] = useMutation<
    CreateConversationData,
    CreateConversationInput
  >(ConvoOps.Mutations.createConversation);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchUsers({ variables: { username } });
  };

  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev) => [...prev, user]);
    setUsername('');
  };

  const removeParticipant = (userId: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== userId));
  };

  const onCreateConversation = async () => {
    console.log('creating convo');
    const others = participants.map((p) => p.id);
    try {
      const { data } = await createConversation({
        variables: {
          participantIds: [me, ...others],
        },
      });
    } catch (err: any) {
      console.error(err);
      toast.error(error?.message as string);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader> Create a conversation </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Stack>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button type="submit" disabled={!username} isLoading={loading}>
                  Search
                </Button>
              </Stack>
            </form>
            {data?.searchUsers && (
              <UserSearchList
                users={data?.searchUsers}
                addParticipant={addParticipant}
                removeParticipant={removeParticipant}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participants
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                <Button
                  bg="barnd.100"
                  width="100%"
                  mt={6}
                  _hover={{ bg: 'brand.100' }}
                  isLoading={convoLoading}
                  onClick={() => onCreateConversation()}
                >
                  {' '}
                  Create Conversation{' '}
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
