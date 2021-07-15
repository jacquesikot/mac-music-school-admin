import '../../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import firebase from 'firebase/app';

import { firebaseConfig } from '../firebase';

function MyApp({ Component, pageProps }) {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
