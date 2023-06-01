import { ChatState } from '../Context/ChatProvider';
import  SideDrawer  from '../components/miscellaneous/SideDrawer';
import  ChatBox  from '../components/ChatBox';
import  MyChats  from '../components/MyChats';
import { Box } from '@chakra-ui/react';


const Chatpage = () => {
  const { user } = ChatState()
  
  return (
    <div style={{width: "100%"}}>
        { user && <SideDrawer />}
        <Box
          d="flex"
          justifyContent='space-between'
          w='100%'
          h='91.5vh'
          p='10px'
          >
            {user && <MyChats />}
            {/* {user && <ChatBox />} */}
        </Box>
    </div>
  ) 
}

export default Chatpage