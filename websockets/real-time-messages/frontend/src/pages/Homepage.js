import React, { useEffect } from 'react'
import { Container, Box, Text, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import { Login } from '../components/authentication/Login'
import { Signup } from '../components/authentication/Signup'
import { useHistory } from 'react-router'

const Homepage = () => {
  const history = useHistory()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
  
    if (user) history.push("/chats")
  }, [history]);

  return (
    <Container maxW='550px' centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize={'4xl'} fontFamily={"Work Sans"} color={"black"}>Talk-A-Tive</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded'>
        <TabList mb="1em">
          <Tab width="50%">Login</Tab>
          <Tab width="50%">Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage