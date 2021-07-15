/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
  Flex,
  Spacer,
  Center,
  Text,
  Button,
  Heading,
  Spinner,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as yup from 'yup';

import Logo from '../assets/macLogo.png';
import FormIcon from '../svgs/FormIcon';
import EmailIcon from '../svgs/EmailIcon';
import { signInUser } from '../firebase/auth';

const formWidth = {
  base: '100%',
  md: '100%',
  lg: 540,
};

function Login() {
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is required to login'),
    password: yup.string().required('Password is required to login'),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await signInUser(values.email, values.password);

      setLoading(false);

      toast({
        title: 'Authentication',
        description: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      setLoading(false);

      console.log(error);

      return toast({
        title: 'Authentication',
        description: 'Error logging in, try again..',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex marginLeft={{ base: 10, md: 10, lg: 20, xl: 20 }} marginTop={10}>
        <Image src={Logo} alt="Mac music school logo" width={116} height={63} />
        <Spacer />
      </Flex>

      <Center
        flexDirection="column"
        marginTop={{ base: 10, md: 0, lg: 10 }}
        marginBottom={50}
      >
        <Heading fontFamily="Inter" color="#323B4B">
          Admin Login
        </Heading>

        <Text fontFamily="Inter" marginTop={5} color="#8A94A6">
          Login to continue!
        </Text>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, handleChange, handleSubmit, handleBlur }) => {
            return (
              <Stack
                spacing={5}
                marginTop={10}
                onSubmit={handleSubmit}
                width={{ base: '90%', md: 'auto', lg: 'auto' }}
              >
                <InputGroup flexDirection="column">
                  <InputLeftElement marginTop={2} children={<EmailIcon />} />
                  <Input
                    fontFamily="Inter"
                    type="email"
                    placeholder="Your Email"
                    width={formWidth}
                    height={54}
                    borderRadius={15}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {errors.email && <Text color="#FF753A">{errors.email}</Text>}
                </InputGroup>

                <InputGroup flexDirection="column">
                  <InputLeftElement marginTop={2} children={<FormIcon />} />
                  <Input
                    fontFamily="Inter"
                    type="password"
                    placeholder="Your Password"
                    width={formWidth}
                    height={54}
                    borderRadius={15}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  {errors.password && (
                    <Text color="#FF753A">{errors.password}</Text>
                  )}
                </InputGroup>

                <Button
                  isLoading={loading}
                  spinner={<Spinner color="#FCF2E8" />}
                  width={{ base: '100%', md: '100%', lg: 540 }}
                  height={54}
                  borderRadius={15}
                  marginTop={10}
                  backgroundColor="#FCF2E8"
                  textColor="#FF753A"
                  _hover={{ bg: '#FF753A', textColor: '#FCF2E8' }}
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
              </Stack>
            );
          }}
        </Formik>
      </Center>
    </>
  );
}

export default Login;
