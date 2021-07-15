import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Flex,
  Spacer,
  Center,
  Text,
  Button,
  Heading,
  Box,
} from '@chakra-ui/react';

import Logo from '../assets/macLogo.png';
import CheckMark from '../svgs/CheckMark';

function StudentDetails() {
  const router = useRouter();

  const handleClick = () => {
    router.push('https://www.google.com/');
  };
  return (
    <>
      <Head>
        <title>Register Success</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex marginLeft={{ base: 10, md: 10, lg: 20, xl: 20 }} marginTop={10}>
        <Image src={Logo} alt="Mac music school logo" width={116} height={63} />
        <Spacer />
      </Flex>

      <Center>
        <Heading fontFamily="Inter" color="#323B4B">
          Admin Dashboard
        </Heading>

        <Text fontFamily="Inter" marginTop={5} color="#8A94A6">
          All Students
        </Text>
      </Center>
    </>
  );
}

export default StudentDetails;
