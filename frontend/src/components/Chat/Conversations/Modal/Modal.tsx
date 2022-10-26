/*eslint-env browser */

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConversationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Modal title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Modal body</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
