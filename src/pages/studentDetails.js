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
  useToast,
  Spinner,
} from '@chakra-ui/react';

import Logo from '../assets/macLogo.png';
import { getStudentAttendance, deleteAttendance } from '../firebase/attendance';
import msToTime from '../utils/msToTime';
import createDate from '../utils/createDate';

function StudentDetails() {
  const router = useRouter();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [attendance, setAttendance] = useState([]);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [deleteId, setDeleteId] = useState('');

  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      await deleteAttendance(id);
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
        description: 'Error deleting record',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    if (router.query.id) {
      const getAttendance = async () => {
        const attendance = await getStudentAttendance(router.query.id);
        if (attendance === null) {
          setAttendance([]);
        } else {
          setAttendance(attendance);
        }
      };

      getAttendance();
    }
    setPageLoading(false);
  }, [router.query.id, deleteLoading]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Student Attendance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this record?</ModalBody>

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
        <title>Student Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex marginLeft={{ base: 10, md: 10, lg: 20, xl: 20 }} marginTop={10}>
        <Image src={Logo} alt="Mac music school logo" width={116} height={63} />
        <Spacer />
      </Flex>

      <Center flexDirection="column">
        <Heading fontFamily="Inter" color="#323B4B">
          {`${router.query.name}'s Attandance Records`}
        </Heading>

        <Table variant="simple" width="auto" marginTop="10">
          <TableCaption>{`${router.query.name}'s Attandance Records`}</TableCaption>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Time In</Th>
              <Th>Time out</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attendance.map((a) => (
              <Tr
                key={a.id}
                fontFamily="Inter"
                color="#323B4B"
                fontWeight={600}
              >
                <Td>
                  {createDate(a.time_in_day, a.time_in_month, a.time_in_year)}
                </Td>
                <Td>{msToTime(a.time_in_ms)}</Td>
                <Td>{msToTime(a.time_out_ms)}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      onOpen();
                      setDeleteId(a.id);
                    }}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Center>
    </>
  );
}

export default StudentDetails;