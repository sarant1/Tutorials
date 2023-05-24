import React from 'react'
import { FormLabel, FormControl, StackDivider, VStack, Input, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { useState } from 'react';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false)

    const postDetails = () => {

    }

    const submitHandler = (e) => {
    
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
              placeholder='Enter Your Email'
              onChange={ (e) => setEmail(e.target.value) } >
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
                type={show ? "text" : "password"} >
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
        >
            Sign In
        </Button>

        <Button
            colorScheme='red'
            width="100%"
            variant="solid"
            onClick={() => {
                setEmail("guest@example.com")
                setPassword("123456")
            }}
        >
            Get Guest Account
        </Button>
    </VStack>
  )
}

