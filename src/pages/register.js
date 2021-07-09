/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Formik } from 'formik';
import * as yup from 'yup';

import Logo from '../assets/macLogo.png';
import EmailIcon from '../svgs/EmailIcon';
import FormIcon from '../svgs/FormIcon';

import {
  Center,
  Text,
  Flex,
  Spacer,
  Heading,
  Stack,
  InputGroup,
  Input,
  InputLeftElement,
  Box,
  Select,
  Button,
} from '@chakra-ui/react';

function Register() {
  const [gender, setGender] = useState('');
  const [instrument, setInstrument] = useState('');

  const formWidth = {
    base: '100%',
    md: '100%',
    lg: 540,
  };

  const RegisterSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is required to register'),
    phoneNumber: yup
      .number('Phone number must be a number')
      .required('Phone number is required to register'),
    name: yup.string().required('Childs name is required to register'),
    age: yup
      .number('Age must be a number')
      .required('Childs age is required to register'),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex marginLeft={{ base: 10, md: 10, lg: 20, xl: 20 }} marginTop={10}>
        <Image src={Logo} alt="Mac music school logo" width={116} height={63} />
        <Spacer />
      </Flex>

      <Center
        flexDirection="column"
        marginTop={{ base: 10, md: 0, lg: 0 }}
        marginBottom={50}
      >
        <Heading fontFamily="Inter" color="#323B4B">
          Getting Started
        </Heading>

        <Text fontFamily="Inter" marginTop={5} color="#8A94A6">
          Create an account to continue!
        </Text>

        <Formik
          initialValues={{
            email: '',
            phoneNumber: '',
            name: '',
            age: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, handleChange, handleSubmit }) => (
            <Stack spacing={5} marginTop={10} onSubmit={handleSubmit}>
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
                />
                {errors.email && <Text color="#FF753A">{errors.email}</Text>}
              </InputGroup>

              <InputGroup flexDirection="column">
                <InputLeftElement marginTop={2} children={<FormIcon />} />
                <Input
                  fontFamily="Inter"
                  type="number"
                  placeholder="Your Phone Number"
                  width={formWidth}
                  height={54}
                  borderRadius={15}
                  onChange={handleChange('phoneNumber')}
                />
                {errors.phoneNumber && (
                  <Text color="#FF753A">{errors.phoneNumber}</Text>
                )}
              </InputGroup>

              <InputGroup flexDirection="column">
                <InputLeftElement marginTop={2} children={<FormIcon />} />
                <Input
                  fontFamily="Inter"
                  type="text"
                  placeholder="Your Childs Name"
                  width={formWidth}
                  height={54}
                  borderRadius={15}
                  onChange={handleChange('name')}
                />
                {errors.name && <Text color="#FF753A">{errors.name}</Text>}
              </InputGroup>

              <InputGroup flexDirection="column">
                <InputLeftElement marginTop={2} children={<FormIcon />} />
                <Input
                  fontFamily="Inter"
                  type="number"
                  placeholder="Your Childs Age"
                  width={formWidth}
                  height={54}
                  borderRadius={15}
                  onChange={handleChange('age')}
                />
                {errors.age && <Text color="#FF753A">{errors.age}</Text>}
              </InputGroup>

              <Box display="flex" flexDirection="row">
                <Select
                  placeholder="Select Gender"
                  width="48%"
                  height={54}
                  borderRadius={15}
                  color="#8A94A6"
                  fontFamily="Inter"
                >
                  <option value="option1">Male</option>
                  <option value="option2">Female</option>
                </Select>

                <Spacer />

                <Select
                  placeholder="Set Instrument"
                  width="48%"
                  height={54}
                  borderRadius={15}
                  color="#8A94A6"
                  fontFamily="Inter"
                >
                  <option value="option1">Guitar</option>
                  <option value="option2">Piano</option>
                  <option value="option2">Singing</option>
                  <option value="option2">Violin</option>
                </Select>
              </Box>

              <Button
                width={{ base: '100%', md: '100%', lg: 540 }}
                height={54}
                borderRadius={15}
                marginTop={10}
                backgroundColor="#FCF2E8"
                textColor="#FF753A"
                _hover={{ bg: '#FF753A', textColor: '#FCF2E8' }}
                onClick={handleSubmit}
              >
                Proceed to payment
              </Button>
            </Stack>
          )}
        </Formik>
      </Center>
    </>
  );
}

export default Register;
