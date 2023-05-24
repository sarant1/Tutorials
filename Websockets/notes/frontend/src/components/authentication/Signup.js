import React from 'react'
import { FormLabel, FormControl, StackDivider, VStack, Input, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { useState } from 'react';

export const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState('');


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
        <FormControl id='first-name' isRequired>
            <FormLabel>
                Name
            </FormLabel>
            <Input
              placeholder='Enter Your Name'
              onChange={ (e) => setName(e.target.value) } >
            </Input>
        </FormControl>

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

        <FormControl id='confirmPassword' isRequired>
            <FormLabel>
                Confirm Password
            </FormLabel>
            <InputGroup>
                <Input
                placeholder='Confirm Your Password'
                onChange={ (e) => setConfirmPassword(e.target.value) }
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

        <FormControl id='picture' isRequired>
            <FormLabel>
                Picture
            </FormLabel>
            <Input
              placeholder='Upload Your Picture'
              onChange={ (e) => postDetails(e.target.files[0]) }
              type={"file"} 
              accept='images/*'>
            </Input>
        </FormControl>

        <Button
            colorScheme='blue'
            width="100%"
            style={{ marginTop: 15}}
            onClick={submitHandler}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

