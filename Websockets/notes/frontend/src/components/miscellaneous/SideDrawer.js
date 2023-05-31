import React from 'react'
import { useState } from "react"
import { useToast, Box, DrawerContent, Button, Tooltip, Text, Menu, MenuButton, MenuList, MenuItem, Avatar, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerHeader, DrawerBody, Input, Toast} from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider'
import { useHistory } from 'react-router'
import ProfileModal from './ProfileModal'
import ChatLoading from '../ChatLoading'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'

const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const history = useHistory()
  const { user, setSelectedChat, chats, setChats } = ChatState()

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    history.push('/')
  }

  const toast = useToast()

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
      };

      const { data } = await axios.post(`/api/chat'`, {userId}, config)

      setSelectedChat(false);
      setLoadingChat(false);
      onClose();

    } catch (error) {
      toast ({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      })
    }
  }

  const handleSearch = async () => {
    if(!search) {
      toast({
        title: 'Please enter a name to search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left'
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
        const { data } = await axios.get(`/api/user?search=${search}`, config)
        setLoading(false);
        setSearchResults(data);
    } catch (error) {
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      });
    }
  }


  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px">
        <Tooltip label="Search Users to chat" 
        hasArrow
        placement='bottom'>
          <Button variant="ghost" onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text
              display={{base:"none", 
                  md: "flex" }}
                px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon 
                fontSize="2xl" 
                margin={1}>
              </BellIcon>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar 
                size='sm' 
                cursor='pointer' 
                name={user.name}
                src={user.pic} />
            </MenuButton>
              <MenuList>
                <ProfileModal user={user}>
                  <MenuItem>MyProfile</MenuItem>
                </ProfileModal>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
          </Menu>
          
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
        <DrawerBody>
          <Box
            display='flex'
            pb={2}
          >
            <Input
              placeholder="Serach by name or email"
              mr={2}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
            <Button onClick={handleSearch}> Go
            </Button>
          </Box>
          { loading ? (
              <ChatLoading/>
            ) : (
              searchResults?.map((user) => (
                <UserListItem 
                  key={user._id}
                  user={user}
                  handleFunction={()=>accessChat(user._id)}
                />)
              )
            )}             
        </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default SideDrawer