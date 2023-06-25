import React from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"
import { ChatState } from '../../Context/ChatProvider'
import { useState } from 'react'
import { useToast, Box, Input, FormControl  } from '@chakra-ui/react'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'

const GroupChatModal = ({ children }) => {
    const {isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName ] = useState('')
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)

    const toast = useToast();

    const { user, chats, setChats } = ChatState()
    
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

    const handleSubmit = async() => {
        if(!groupChatName || !selectedUsers) {
            toast({
                title: "Error",
                description: "Please enter a group name and select users",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            return
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            console.log("SELECTED_USERS", JSON.stringify(selectedUsers.map(user => user._id)))

            const { data } = await axios.post(`/api/chat/group`, {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map(user => user._id))
            }, config)

            setChats([...chats, data])
            onClose()

            toast({
                title: "Success",
                description: "Group Chat Created",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to Create Group Chat",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }
    
    const handleDelete = (userToDelete) => {
        setSelectedUsers(selectedUsers.filter(user => user._id !== userToDelete._id))
    }

    

    const handleGroup = (userToAdd) => {
        console.log(userToAdd)
        if(selectedUsers.includes(userToAdd)) {
            toast({
                title: "Error",
                description: "User already added",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'postion-top'
            })
            return
        }

        setSelectedUsers([...selectedUsers, userToAdd])
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
                w="100%"
                display="flex"
                flexDir="column"
                flexWrap="wrap"
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
                <Box
                    w="100%" display="flex" flexWrap="wrap"
                >
                    {selectedUsers.map(user => (
                        <UserBadgeItem key={user._id} user={user} handleFunction={() => handleDelete(user)}/>
                    ))}
                </Box>
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