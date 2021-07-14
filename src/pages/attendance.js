import React, { useEffect, useState } from 'react';
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
  Spinner,
} from '@chakra-ui/react';

import Logo from '../assets/macLogo.png';

function Success() {
  const [loading, setLoading] = useState(true);
  const [param, setParam] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (router.query) {
      setParam(true);
    }
  }, [router]);

  const handleClick = () => {
    router.push('https://www.google.com/');
  };

  if (!param) {
    return (
      <>
        <Text>No Param Set </Text>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Attendance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex marginLeft={{ base: 10, md: 10, lg: 20, xl: 20 }} marginTop={10}>
        <Image src={Logo} alt="Mac music school logo" width={116} height={63} />
        <Spacer />
      </Flex>

      <Center marginTop={20} flexDirection="column" width="auto">
        <Heading
          textAlign="center"
          marginTop={10}
          fontFamily="Inter"
          color="#323B4B"
        >
          {`Set ${router.query.studentName} Attendance`}
        </Heading>
      </Center>
    </>
  );
}

export default Success;
