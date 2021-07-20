import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Spacer,
  Center,
  Text,
  Button,
  Heading,
  useToast,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';

import Logo from '../assets/macLogo.png';
import { logOutUser } from '../firebase/auth';
import { getAllTutors, deleteTutor } from '../firebase/tutors';
import capitalize from '../utils/capitalize';

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const [tutors, setTutors] = useState([]);

  const [deleteId, setDeleteId] = useState('');

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const toast = useToast();

  const handleView = (id, name) => {
    router.push({
      pathname: '/tutorDetails',
      query: {
        id,
        name,
      },
    });
  };

  const handleStudentDashboard = () => {
    router.push({
      pathname: '/dashboard',
    });
  };

  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      await deleteTutor(id);
      setDeleteLoading(false);
      onClose();
      toast({
        title: 'Delete',
        description: 'Tutor deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      setDeleteLoading(false);
      console.log(error);
      onClose();
      toast({
        title: 'Delete',
        description: 'Error deleting tutor',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    const getTutors = async () => {
      setPageLoading(true);
      try {
        const tutors = await getAllTutors();
        if (tutors === null) {
          setTutors([]);
        } else {
          setTutors(tutors);
        }
        setPageLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getTutors();
  }, [deleteLoading]);

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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Tutor Record</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this tutor?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              isLoading={deleteLoading}
              onClick={() => handleDelete(deleteId)}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Head>
        <title>Tutor Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        paddingLeft={{ base: 10, md: 10, lg: 20, xl: 20 }}
        paddingRight={{ base: 10, md: 10, lg: 20, xl: 20 }}
        marginTop={10}
        flexDirection="row"
        display="flex"
        alignItems="center"
      >
        <Link href="/" passHref>
          <Image
            src={Logo}
            alt="Mac music school logo"
            width={116}
            height={63}
          />
        </Link>
        <Spacer />

        <Button mr={5} onClick={handleStudentDashboard} colorScheme="blue">
          Student Dashboard
        </Button>

        <Button onClick={handleLogout} colorScheme="red">
          Log Out
        </Button>
      </Box>
      <Center flexDirection="column">
        <Heading fontFamily="Inter" color="#323B4B">
          Tutors Dashboard
        </Heading>

        <Text fontFamily="Inter" marginTop={5} color="#8A94A6">
          All Tutors
        </Text>

        {pageLoading ? (
          <Spinner mt={30} />
        ) : tutors.length < 1 ? (
          <Text mt={20}>No Tutors Registered</Text>
        ) : (
          <Table variant="simple" width="auto" marginTop="10">
            <TableCaption>All Registered Tutors</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Contact</Th>
                <Th>Email</Th>
                <Th>Gender</Th>
                <Th>Lesson</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tutors.map((s) => (
                <Tr
                  key={s.id}
                  fontFamily="Inter"
                  color="#323B4B"
                  fontWeight={600}
                >
                  <Td>{s.name}</Td>
                  <Td>{s.phone}</Td>
                  <Td>{s.email}</Td>
                  <Td>{s.gender}</Td>
                  <Td>{s.instrument}</Td>
                  <Td>
                    <Box>
                      <Button
                        onClick={() => handleView(s.id, s.name)}
                        marginRight="3"
                        colorScheme="green"
                      >
                        View
                      </Button>
                      <Button marginRight="3" colorScheme="blue">
                        Send Email
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          onOpen();
                          setDeleteId(s.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Center>
    </>
  );
}

export default Dashboard;
