import React from 'react'
import { FormLabel, FormControl, StackDivider, VStack, Input, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { useState } from 'react';
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState('');
    const [loading, setLoading] = useState(false);
    
    const history = useHistory();
    const toast = useToast();

    const postDetails = (pic) => {
        setLoading(true);
        if (pic===undefined) {
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
                });
            return; 
        }

        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "du1dwlcxa");
            fetch("https://api.cloudinary.com/v1_1/du1dwlcxa/image/upload", {
                method: "POST",
                body: data
                }
            )
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                console.log("Uploaded")
                setPic(data.url.toString())
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error: ", err);
                setLoading(false);
            });
        } else {
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
                });
            setLoading(false);
            return;
            }
        }

    const submitHandler = async (e) => {
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
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
        if (password !== confirmPassword) {
            toast({
                title: 'Passwords Do Not Match',
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
            };
            const { data } = await axios.post("/api/user", {name, email, password, pic}, config)

            toast({
                title: 'User Created',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })

            localStorage.set("userInfo", JSON.stringify(data))
            setLoading(false)
            history.push('/chats');
        } catch (error) {
            toast({
                title: 'Error Occured',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
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
              onChange={ (e) =>  postDetails(e.target.files[0]) }
              type={"file"} 
              accept='images/*'>
            </Input>
        </FormControl>

        <Button
            colorScheme='blue'
            width="100%"
            style={{ marginTop: 15}}
            onClick={submitHandler}
            isLoading={loading}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

