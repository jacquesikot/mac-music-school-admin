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

function Success() {
  const router = useRouter();

  const handleClick = () => {
    router.push('https://www.macmusicschool.com/');
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
        <Center marginTop={20} flexDirection="column" width="80%">
          <CheckMark />

          <Heading
            textAlign="center"
            marginTop={10}
            fontFamily="Inter"
            color="#323B4B"
          >
            Thank you for registering with us!
          </Heading>

          <Text
            textAlign="center"
            fontFamily="Inter"
            marginTop={5}
            color="#8A94A6"
          >
            {`A confirmation email has been sent to ${router.query.email}`}
          </Text>

          <Text
            textAlign="center"
            fontFamily="Inter"
            marginTop={5}
            color="#8A94A6"
          >
            Please check your spam and promotion folders alongside your primary
            email.
          </Text>

          <Button
            width={{ base: '100%', md: '100%', lg: 540 }}
            height={54}
            borderRadius={15}
            marginTop={10}
            backgroundColor="#FCF2E8"
            textColor="#FF753A"
            _hover={{ bg: '#FF753A', textColor: '#FCF2E8' }}
            onClick={handleClick}
          >
            Continue to website
          </Button>
        </Center>
      </Center>
    </>
  );
}

export default Success;
