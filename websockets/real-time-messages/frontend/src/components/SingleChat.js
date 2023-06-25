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
import './styles.css';
import Scrollablechat from './Scrollablechat'
import io from 'socket.io-client';
import Lottie from 'react-lottie'
import animationData from '../animations/typing.json'

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
        preserverAspectRatio: 'xMidYMid slice'
    }
}

const ENDPOINT = 'http://localhost:5000';
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
 
  const { user, selectedChat, setSelectedChat, setNotification, notification} = ChatState()
  const [ loading, setLoading ] = useState(false)
  const [ messages, setMessages ] = useState([]);
  const [ newMessage, setNewMessage ] = useState("");
  const [ socketConnected, setSocketConnected ] = useState(false);
  const [ typing, setTyping ] = useState(false)
  const [ isTyping, setIsTyping ] = useState(false)

  const toast = useToast()

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on('connected', () => {
    setSocketConnected(true);
    socket.on('typing', () => setIsTyping(true))
    socket.on('stop typing', () => setIsTyping(false))
    })
  }, [])

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
      setLoading(false)
      
      socket.emit("join chat", selectedChat._id)

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

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  // eslint-disable-next-line
  }, [selectedChat])

  console.log(notification, "---------")

  // this will run every time our app updates
  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
        if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
            if (!notification.includes(newMessageRecieved)) {
                setNotification([...notification, newMessageRecieved]);
                setFetchAgain(!fetchAgain)
            }
        } else {
            setMessages([...messages, newMessageRecieved])
        }

    } )
  })

 

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
        socket.emit('stop typing', selectedChat._id)
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
            
            socket.emit("new message", data)

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

    if(!socketConnected) return;

    if (!typing) {
        setTyping(true)
        socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime()
    var timerLength = 3000;
    setTimeout(() => {
        var timeNow = new Date().getTime()
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
            socket.emit("stop typing", selectedChat._id)
            setTyping(false)
        }       
    }, timerLength)
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
                                { <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}/>}
                            </>
                        )
                    }
                </Text>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        flexDir="column"
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
                            <div className="messages">
                                <Scrollablechat messages={messages} />
                            </div>
                        )}

                        <FormControl
                            onKeyDown={sendMessage}
                            isRequired
                            mt={3}
                        >
                            { isTyping ? (
                            <div>
                                <Lottie
                                    options={defaultOptions}
                                    width={70}
                                    style={{ marginBottom: 15, marginLeft: 0}}
                                />
                            </div>) : <></>}
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