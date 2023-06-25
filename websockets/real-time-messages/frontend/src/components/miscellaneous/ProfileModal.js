import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, Modal, ModalBody, ModalFooter, Button, ModalHeader, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure, Image, Text } from '@chakra-ui/react'
import React from 'react'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
  return (
    <>
        {children ? ( 
            <span onClick={onOpen}>{children}</span> 
            ) : (
            <IconButton
                display={{base: "flex" }}
                icon={<ViewIcon />}
                onClick={onOpen}
            />
         )}

      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work Sans"
            fontWeight="bold"
            display="flex"
            justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody 
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
            />
            <Text>{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal