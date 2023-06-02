import { Box } from '@chakra-ui/react';
import React from 'react'
import { Avatar, Text } from '@chakra-ui/react';
import { ChatState } from '../../Context/ChatProvider';

const UserListItem = ({ user, handleFunction }) => {


  return (
    <div>
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#E8E8E8"
            width="100%"
            _hover={{
              background: "#38B2AC",
              color: "white",
            }}
            display="flex"
            flex={1}
            alignItems="center"
            color="black"
            flexGrow={1}
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor
                name={user.name}
                src={user.pic}
                />
         <Box>
            <Text>{user.name}</Text>
            <Text fontSize="xs">
                <b>Email : </b>
                {user.email}
            </Text>
         </Box>
        </Box>
    </div>
  )
}

export default UserListItem