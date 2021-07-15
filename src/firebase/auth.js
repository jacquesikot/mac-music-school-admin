import firebase from 'firebase/app';

const signInUser = async (email, password) => {
  const signedUser = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  const user = signedUser.user;
  return user;
};

const logOutUser = async () => {
  await firebase.auth().signOut();
};

export { signInUser, logOutUser };
