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
  const [loading, setLoading] = useState(false);
  const [param, setParam] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setParam(true);
    }

    () => setParam(false);
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
          {`Set ${router.query.name} Attendance`}
        </Heading>
      </Center>

      <Center width={{ base: '100%', md: 'auto', lg: 'auto' }}>
        <Center display="flex" flexDirection="column">
          <Button
            isLoading={loading}
            spinner={<Spinner color="#FCF2E8" />}
            width={{ base: '150%', md: '100%', lg: 540 }}
            height={54}
            borderRadius={15}
            marginTop={10}
            backgroundColor="#FCF2E8"
            textColor="#FF753A"
            _hover={{ bg: '#FF753A', textColor: '#FCF2E8' }}
            // onClick={}
          >
            Log Time In
          </Button>

          <Button
            isLoading={loading}
            spinner={<Spinner color="#FCF2E8" />}
            width={{ base: '150%', md: '100%', lg: 540 }}
            height={54}
            borderRadius={15}
            marginTop={10}
            backgroundColor="#FCF2E8"
            textColor="#FF753A"
            _hover={{ bg: '#FF753A', textColor: '#FCF2E8' }}
            // onClick={}
          >
            Log Time Out
          </Button>
        </Center>
      </Center>
    </>
  );
}

export default Success;
