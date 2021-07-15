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
  useToast,
} from '@chakra-ui/react';

import Logo from '../assets/macLogo.png';
import { logTimeIn, logTimeOut, getTodaysRecord } from '../firebase/attendance';
// import msToTime from '../utils/msToTime';

function Attendance() {
  const PASSCODE = '1234';

  const [loadingTimeIn, setLoadingTimeIn] = useState(false);
  const [loadingTimeOut, setLoadingTimeOut] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [param, setParam] = useState(false);

  const [timeIn, setTimeIn] = useState(false);
  const [timeOut, setTimeOut] = useState(false);

  const [todaysRecord, setTodaysRecord] = useState({});

  const router = useRouter();

  const toast = useToast();

  useEffect(() => {
    if (router.query.id) {
      setParam(true);

      const setTimeInStatus = async () => {
        const record = await getTodaysRecord(router.query.id);

        if (record) {
          setTimeIn(true);
          // setTodaysRecord(record);
        }
      };

      const setTimeOutStatus = async () => {
        const record = await getTodaysRecord(router.query.id);

        if (record && record[0].time_out_full !== '') {
          setTimeOut(true);
          // setTodaysRecord(record);
        }
      };

      setTimeInStatus();
      setTimeOutStatus();
      setPageLoading(false);
    }

    () => {
      setParam(false);
    };
  }, [router.query.id, loadingTimeIn, loadingTimeOut]);

  const handleLogTimeIn = async () => {
    const code = prompt('Enter Passcode');
    if (code !== PASSCODE)
      return toast({
        title: 'Attendance',
        description: 'Passcode Error.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    try {
      setLoadingTimeIn(true);

      await logTimeIn(router.query.id);

      setLoadingTimeIn(false);

      toast({
        title: 'Attendance',
        description: 'Time in successfully logged.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.log(error);

      setLoadingTimeIn(false);

      toast({
        title: 'Attendance',
        description: 'Logging Time in Error.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleLogTimeOut = async () => {
    const code = prompt('Enter Passcode');
    if (code !== PASSCODE)
      return toast({
        title: 'Attendance',
        description: 'Passcode Error.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    try {
      setLoadingTimeOut(true);

      await logTimeOut(router.query.id);

      setLoadingTimeOut(false);

      toast({
        title: 'Attendance',
        description: 'Time out successfully logged.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.log(error);

      setLoadingTimeOut(false);

      toast({
        title: 'Attendance',
        description: 'Logging Time out Error.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  if (!param) {
    return (
      <>
        <Text>No Param Set </Text>
      </>
    );
  }

  // if (pageLoading) {
  //   return (
  //     <Center marginTop="25%">
  //       <Spinner />
  //     </Center>
  //   );
  // }

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
            isLoading={loadingTimeIn}
            spinner={<Spinner color="#FCF2E8" />}
            width={{ base: '150%', md: '100%', lg: 540 }}
            height={54}
            borderRadius={15}
            marginTop={10}
            colorScheme="green"
            onClick={handleLogTimeIn}
            disabled={timeIn}
          >
            {timeIn ? 'Already logged Time in at' : 'Log Time In'}
          </Button>

          <Button
            isLoading={loadingTimeOut}
            spinner={<Spinner color="#FCF2E8" />}
            width={{ base: '150%', md: '100%', lg: 540 }}
            height={54}
            borderRadius={15}
            marginTop={10}
            colorScheme="red"
            onClick={handleLogTimeOut}
            disabled={timeOut}
          >
            {timeOut ? 'Already logged Time out' : 'Log Time Out'}
          </Button>
        </Center>
      </Center>
    </>
  );
}

export default Attendance;
