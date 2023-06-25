import React from 'react'
import { FormLabel, FormControl, StackDivider, VStack, Input, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { useState } from 'react';
import { useToast } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from "axios";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false);
    
    const history = useHistory();
    const toast = useToast();

    const submitHandler = async (e) => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: 'Please Enter All Fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
                });
            setLoading(false);
            return; 
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post("/api/user/login", { 
                email, 
                password }, config);
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });    
            
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push('/chats');
        } catch {
            toast({
                title: 'Login Failed',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
        }
    }
  return (
    <VStack
    divider={<StackDivider borderColor='gray.200' />}
    spacing={3}
    align='stretch'
    color={'black'}
    >
        <FormControl id='email' isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input
              value={email}
              placeholder='Enter Your Email'
              onChange={ (e) => setEmail(e.target.value) } 
              >             
            </Input>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
                <Input
                placeholder='Enter Your Password'
                onChange={ (e) => setPassword(e.target.value) }
                type={show ? "text" : "password"} 
                value={password}>
                </Input>
                <InputRightElement width={"4.5rem"}>
                    <Button 
                    h={"1.75rem"} 
                    size={"sm"}
                    onClick={() => setShow(!show)} 
                    >
                    {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>       
            </InputGroup>
        </FormControl>

        <Button
            colorScheme='blue'
            width="100%"
            style={{ marginTop: 15}}
            onClick={submitHandler}
            isLoading={loading}
        >
            Sign In
        </Button>

        <Button
            colorScheme='red'
            width="100%"
            variant="solid"
            onClick={() => {
                setEmail("guest@gmail.com")
                setPassword("123456")
            }}
        >
            Get Guest Account
        </Button>
    </VStack>
  )
}

