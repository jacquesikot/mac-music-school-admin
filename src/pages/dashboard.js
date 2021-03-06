import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import firebase from 'firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import Login from '../pages/login';
import { logOutUser } from '../firebase/auth';
import { getAllStudents, deleteStudent } from '../firebase/student';
import capitalize from '../utils/capitalize';
import { sendMail } from './api/sendMail';

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [students, setStudents] = useState([]);

  const [deleteId, setDeleteId] = useState('');

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const toast = useToast();

  const handleView = (id, name) => {
    router.push({
      pathname: '/studentDetails',
      query: {
        id,
        name,
      },
    });
  };

  const handleTutorDashboard = () => {
    router.push({
      pathname: '/tutorDashboard',
    });
  };

  const handleHome = () => {
    router.push({
      pathname: '/dashboard',
    });
  };

  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      await deleteStudent(id);
      setDeleteLoading(false);
      onClose();
      toast({
        title: 'Delete',
        description: 'Student deleted successfully',
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
        description: 'Error deleting student',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    const getStudents = async () => {
      setPageLoading(true);
      try {
        const students = await getAllStudents();
        if (students === null) {
          setStudents([]);
        } else {
          setStudents(students);
        }
        setPageLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getStudents();
  }, [isLoggedIn, deleteLoading]);

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

  const handleSendmail = async (data) => {
    const info = {
      recipient: data.email,
      wardName: data.wardName,
      studentName: data.name,
      studentClass: data.instrument,
    };

    try {
      await sendMail({ ...info });

      toast({
        title: 'Send Email',
        description: 'Email Sent!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Send Email',
        description: 'Error sending email',
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Student Record</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this student?</ModalBody>

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
          <title>Dashboard</title>
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

          <Button mr={5} onClick={handleTutorDashboard} colorScheme="blue">
            Tutor Dashboard
          </Button>

          <Button onClick={handleLogout} colorScheme="red">
            Log Out
          </Button>
        </Box>
        <Center flexDirection="column">
          <Heading fontFamily="Inter" color="#323B4B">
            Admin Dashboard
          </Heading>

          <Text fontFamily="Inter" marginTop={5} color="#8A94A6">
            All Students
          </Text>

          {pageLoading ? (
            <Spinner mt={30} />
          ) : students.legth < 1 ? (
            <Text mt={30}>No Student Recors Found</Text>
          ) : (
            <Table variant="simple" width="auto" marginTop="10">
              <TableCaption>All Registered Students</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Contact</Th>
                  <Th>Email</Th>
                  <Th>Gender</Th>
                  <Th>Lessons</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {students.map((s) => (
                  <Tr
                    key={s.id}
                    fontFamily="Inter"
                    color="#323B4B"
                    fontWeight={600}
                  >
                    <Td>{capitalize(s.name)}</Td>
                    <Td>{s.phone}</Td>
                    <Td>{s.email}</Td>
                    <Td>{capitalize(s.gender)}</Td>
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
                        {/* <Button
                          onClick={() => handleSendmail(s)}
                          marginRight="3"
                          colorScheme="blue"
                        >
                          Send Email
                        </Button> */}
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
}

export default Dashboard;
