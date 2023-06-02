import React from 'react'
import { useDisclosure, useToast } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { 
Input, 
Box, 
IconButton,
Modal, 
ModalOverlay, 
ModalContent, 
ModalHeader, 
ModalFooter, 
ModalBody, 
ModalCloseButton, 
Button,
Spinner
} from '@chakra-ui/react'
import { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import { FormControl } from '@chakra-ui/react'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'

const UpdateGroupChatModal = ( { fetchAgain, setFetchAgain }) => {

    const [groupChatName, setGroupChatName] = useState('')
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { selectedChat, setSelectedChat, user } = ChatState()

    const toast = useToast()

    const handleRename = async () => {
      if (!groupChatName) return;
  
      try {
        setRenameLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put(
          `/api/chat/rename`,
          {
            chatId: selectedChat._id,
            chatName: groupChatName,
          },
          config
        );
  
        console.log(data._id);
        // setSelectedChat("");
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setRenameLoading(false);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setRenameLoading(false);
      }
      setGroupChatName("");
    };

    const handleAddUser = async(user1) => {
        if (selectedChat.users.find(user => user._id === user1._id)) {
            toast({
                title: "Error",
                description: "User already added",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'postion-top'
            })
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Error",
                description: "Only Admin can add users",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'postion-top'
            })
            return;
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            
            const { data } = await axios.put(`/api/chat/groupadd`, {
                chatId: selectedChat._id,
                userId: user1._id
            }, config)

            setSelectedChat(data);
            setLoading(false);
            setFetchAgain(!fetchAgain);

        } catch (error) {
           toast({
                title: "Error",
                description: "Failed to add user",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'bottom'
           })     
        }
    }
    const handleRemove = async (user1) => {
      console.log("USER TO BE REMOVED")
      console.log(user1)
      if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
        toast({
          title: "Only admins can remove someone!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
  
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put(
          `/api/chat/groupremove`,
          {
            chatId: selectedChat._id,
            userId: user1._id,
          },
          config
        );
  
        user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
      setGroupChatName("");
    };
  

    const handleSearch = async (query) => {
      setSearch(query);
      if (!query) {
        return;
      }
  
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/user?search=${search}`, config);
        setLoading(false);
        setSearchResult(data);
        console.log("SEARCHRESULT")
        console.log(searchResult)
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
        setLoading(false);
      }
    };
  

  return (
    <>
    <IconButton display={{ base: "flex" }} onClick={onOpen} icon={<ViewIcon />}>Open Modal</IconButton>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedChat.chatName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            w="100%" display="flex" flexWrap="wrap" pb={3}
          >
            {selectedChat.users.map((user) => (
              <UserBadgeItem 
                key={user._id} 
                user={user} 
                handleFunction={() => handleRemove(user)}/>
            ))}
          </Box>
              <FormControl
                display="flex"
              >
               <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
               />
                <Button
                  variant="solid"
                  colorScheme="teal"
                  ml={1}
                  isLoading={renameLoading}
                  onClick={handleRename}
                >
                  Update
                </Button>
              </FormControl>
              
              <FormControl>
                <Input 
                  placeholder="Add user to group"
                  mb={1}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>

              {loading ? (
                <Spinner size="lg" />
              ) : (
                <Box
                  w="100%"
                  display="flex"
                  flexDir="column"
                  flexWrap="wrap"
                  pb={3}
                >
                  {
                  searchResult?.map((user) => (
                    <UserListItem 
                      key={user._id}
                      user={user}
                      handleFunction={() => handleAddUser(user)}
                    />
                  ))}
                </Box>
              )}
                
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='red' onClick={() => handleRemove(user)}>
            Leave Group
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default UpdateGroupChatModal