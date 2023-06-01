import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"
import { ChatState } from '../../Context/ChatProvider'
import { useState } from 'react'
import { useToast, Box, Stack, Text, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName ] = useState('')
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)

    const toast = useToast();

    const { user, chat, setChats } = ChatState()

    const handleSearch = async ( query ) => {
        setSearch(query)
        if(!query) {
            return
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const  { data } = await axios.get(`/api/user?search=${search}`, config);

            console.log(data)
            setLoading(false);
            setSearchResults(data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to Search Users",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'bottom-left'
            })
        }
    }

    const handleSubmit = () => {

    }

    const handleGroup = () => {

    }

    return (
      <>
        <span onClick={onOpen}>{ children }</span>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
                fontSize="35px"
                fontFamily="Work Sans"
                justifyContent="center"
                display="flex"
            >Create Group Chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody
                display="flex"
                flexDirection="column"
                alignItems="center"
                background="white"
            >
                <FormControl>
                    <Input 
                        placeholder="Chat Name" 
                        mb={3}
                        onChange={(e) => setGroupChatName(e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <Input 
                        placeholder="Add users eg: John, Adams, Jane" 
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </FormControl>
                {/* selected users */}
                { loading ? <div> loading </div> : searchResults?.slice(0, 4).map(user => (
                    <UserListItem 
                        key={user._ud}
                        user={user}
                        handleFunction={() => handleGroup(user)}
                    />
                ))}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                Create Chat
              </Button>
              
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default GroupChatModal