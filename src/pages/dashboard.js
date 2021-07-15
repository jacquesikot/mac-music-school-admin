import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import firebase from 'firebase';
import {
  Flex,
  Spacer,
  Center,
  Text,
  Button,
  Heading,
  Box,
  useToast,
} from '@chakra-ui/react';

import Logo from '../assets/macLogo.png';
import Login from '../pages/login';
import { logOutUser } from '../firebase/auth';

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toast = useToast();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await logOutUser();
      toast({
        title: 'Authentication',
        description: 'Logout success',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Authentication',
        description: 'Logout error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  if (!isLoggedIn) {
    return <Login />;
  } else {
    return (
      <>
        <Head>
          <title>Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Flex
          marginLeft={{ base: 10, md: 10, lg: 20, xl: 20 }}
          marginRight={{ base: 10, md: 10, lg: 20, xl: 20 }}
          marginTop={10}
        >
          <Image
            src={Logo}
            alt="Mac music school logo"
            width={116}
            height={63}
          />
          <Spacer />

          <Button onClick={handleLogout} colorScheme="red">
            Log Out
          </Button>
        </Flex>

        <Center>
          <Heading
            textAlign="center"
            marginTop={10}
            fontFamily="Inter"
            color="#323B4B"
          >
            All Students
          </Heading>
        </Center>
      </>
    );
  }
}

export default Dashboard;
