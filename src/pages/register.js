/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
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
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { usePaystackPayment } from 'react-paystack';

import Logo from '../assets/macLogo.png';
import EmailIcon from '../svgs/EmailIcon';
import FormIcon from '../svgs/FormIcon';
import { registerStudent } from '../firebase/student';
import sendMail from './api/sendMail';

function Register() {
  const router = useRouter();

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const [gender, setGender] = useState('');
  const [instrument, setInstrument] = useState('');
  const [experience, setExperience] = useState('');
  const [email, setEmail] = useState('');

  const publicKey = process.env.PAYSTACK_PUBLIC_KEY;

  const config = {
    reference: new Date().getTime(),
    email,
    amount: 2500000,
    publicKey,
  };

  const initializePayment = usePaystackPayment(config);

  const formWidth = {
    base: '100%',
    md: '100%',
    lg: 540,
  };

  const RegisterSchema = yup.object().shape({
    wardName: yup.string().required('Your name is required to register'),
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is required to register'),
    phone: yup
      .number('Phone number must be a number')
      .required('Phone number is required to register'),
    name: yup.string().required('Childs name is required to register'),
    age: yup
      .number('Age must be a number')
      .required('Childs age is required to register'),
  });

  const handleSubmit = async (values) => {
    try {
      if (gender === '')
        return toast({
          title: 'Gender.',
          description: 'Gender is required to continue.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      if (instrument === '')
        return toast({
          title: 'Instrument.',
          description: 'Instrument is required to continue.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      if (experience === '')
        return toast({
          title: 'Experience.',
          description: 'Experience is required to continue.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });

      setLoading(true);

      const data = {
        ...values,
        gender,
        instrument,
        experience,
      };

      const onSuccess = async (reference) => {
        toast({
          title: 'Payment.',
          description: 'Payment Success.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });

        router.push({
          pathname: '/success',
          query: data,
        });

        await registerStudent(data);

        await sendMail(data);
      };

      const onClose = () => {
        toast({
          title: 'Payment.',
          description: 'Payment not successful.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      };

      initializePayment(onSuccess, onClose);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: 'Register.',
        description: 'Error registering student, please try again...',
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
            wardName: '',
            email: '',
            phone: '',
            name: '',
            age: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleChange,
            handleSubmit,
            validateForm,
            handleBlur,
          }) => {
            return (
              <Stack
                spacing={5}
                marginTop={10}
                onSubmit={handleSubmit}
                width={{ base: '90%', md: 'auto', lg: 'auto' }}
              >
                <InputGroup flexDirection="column">
                  <InputLeftElement marginTop={2} children={<FormIcon />} />
                  <Input
                    fontFamily="Inter"
                    type="text"
                    placeholder="Your Full Name"
                    width={formWidth}
                    height={54}
                    borderRadius={15}
                    onChange={handleChange('wardName')}
                    onBlur={handleBlur('wardName')}
                  />
                  {errors.wardName && (
                    <Text color="#FF753A">{errors.wardName}</Text>
                  )}
                </InputGroup>

                <InputGroup flexDirection="column">
                  <InputLeftElement marginTop={2} children={<EmailIcon />} />
                  <Input
                    fontFamily="Inter"
                    type="email"
                    placeholder="Your Email"
                    width={formWidth}
                    height={54}
                    borderRadius={15}
                    onChange={(e) => {
                      handleChange('email')(e);
                      setEmail(e.target.value);
                    }}
                    onBlur={handleBlur('email')}
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
                    onChange={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                  />
                  {errors.phone && <Text color="#FF753A">{errors.phone}</Text>}
                </InputGroup>

                <InputGroup flexDirection="column">
                  <InputLeftElement marginTop={2} children={<FormIcon />} />
                  <Input
                    fontFamily="Inter"
                    type="text"
                    placeholder="Your Childs Full Name"
                    width={formWidth}
                    height={54}
                    borderRadius={15}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  {errors.name && <Text color="#FF753A">{errors.name}</Text>}
                </InputGroup>

                <Box display="flex" flexDirection="row">
                  <InputGroup flexDirection="column" width="48%">
                    <InputLeftElement marginTop={2} children={<FormIcon />} />
                    <Input
                      fontFamily="Inter"
                      type="number"
                      placeholder="Childs Age"
                      height={54}
                      borderRadius={15}
                      onChange={handleChange('age')}
                      onBlur={handleBlur('age')}
                    />
                    {errors.age && <Text color="#FF753A">{errors.age}</Text>}
                  </InputGroup>

                  <Spacer />

                  <Select
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Experience"
                    width="48%"
                    height={54}
                    borderRadius={15}
                    fontFamily="Inter"
                    color="#8a98ac"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermidiate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </Select>
                </Box>

                <Box display="flex" flexDirection="row">
                  <Select
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Gender"
                    width="48%"
                    height={54}
                    borderRadius={15}
                    color="#8a98ac"
                    fontFamily="Inter"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>

                  <Spacer />

                  <Select
                    onChange={(e) => setInstrument(e.target.value)}
                    placeholder="Instrument"
                    width="48%"
                    height={54}
                    borderRadius={15}
                    color="#8a98ac"
                    fontFamily="Inter"
                  >
                    <option value="Bass Guitar Lessons">
                      Bass Guitar Lessons
                    </option>
                    <option value="Keyboard + Piano Lessons">
                      Keyboard + Piano Lessons
                    </option>
                    <option value="Drum Lessons">Drum Lessons</option>
                    <option value="Violin Lessons">Violin Lessons</option>
                    <option value="Singing Lessons">Singing Lessons</option>
                  </Select>
                </Box>

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
                  Proceed to payment
                </Button>
              </Stack>
            );
          }}
        </Formik>
      </Center>
    </>
  );
}

export default Register;
