import React, { useEffect } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, Text, IconButton, FormControl, Input } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from '../config/ChatLogics'
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'
import { Spinner } from '@chakra-ui/spinner'
import { useState } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/toast'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
 
  const { user, selectedChat, setSelectedChat } = ChatState()
  const [ loading, setLoading ] = useState(false)
  const [ messages, setMessages ] = useState([]);
  const [ newMessage, setNewMessage ] = useState("");

  const toast = useToast()

  useEffect(() => {
    fetchMessages();
  // eslint-disable-next-line
  }, [selectedChat])

  const fetchMessages = async () => {
    if(!selectedChat) return;

    try {
      setLoading(true)

      const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
      }


      const { data } = await axios.get(`/api/message/${selectedChat._id}`, config)

      
      setMessages(data)
      console.log(messages)
      setLoading(false)
    } catch (error) {
        toast({
            title: "An error occurred.",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom"
        })

        setLoading(false)
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }

            setNewMessage("")
            const { data } = await axios.post('/api/message', {
                content: newMessage,
                chatId: selectedChat._id
            }, config)
            
            console.log(data)

            setLoading(false)
            setMessages([...messages, data])
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "bottom"
            })

            setLoading(false)
        }
    }
  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value)

    // Typing Indicator
  }
  
  return (
    <>
        {selectedChat ? ( 
        // if selectedChat is true, then render the following:
            <>
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3}
                    fontFamily="Work sans"
                    px={2}
                    w="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent={{ base: "space-between" }}
                >
                    <IconButton
                        display={{ base: "flex", md: "none"}}
                        icon={<ArrowBackIcon />}
                        onClick={() => setSelectedChat(null)}
                    />
                    
                    {
                        !selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal 
                                    user={getSenderFull(user, selectedChat.users)}
                                />
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                { <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                            </>
                        )
                    }
                </Text>
                    <Box
                        display="flex"
                        alignItems="end" 
                        flexdir="column"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (
                            <Spinner 
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                                />
                        ) : (
                            <>
                                {/* {messages} */}
                            </>
                        )}

                        <FormControl
                            onKeyDown={sendMessage}
                            isRequired
                            mt={3}
                        >
                            <Input 
                                variant="filled"
                                bg="E0E0E0"
                                placeholder="Enter a message..."
                                onChange={typingHandler}
                                value={newMessage}
                            />
                        </FormControl>
                    </Box>
            </>
        ) : (
        
        // otherwise, render the following:
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="100%"
            >
                <Text
                    fontSize="3xl"
                    pb={3}
                    fontFamily="Work sans"
                >
                    Click on a user to start chatting
                </Text>
            </Box>
        )}
    </>
  )
}

export default SingleChat