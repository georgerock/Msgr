/*eslint-env browser */

import { useLazyQuery } from '@apollo/client';
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
import UserOps from '../../../../graphql/ops/user';
import {
  SearchUsersData,
  SeachUsersInput,
  SearchedUser,
} from '../../../../util/types';
import { Participants } from './Participants';
import { UserSearchList } from './UserSearchList';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConversationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [username, setUsername] = useState('');
  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUsersData,
    SeachUsersInput
  >(UserOps.Queries.searchUsers);

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
              <Participants
                participants={participants}
                removeParticipant={removeParticipant}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
