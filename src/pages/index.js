import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';

import Logo from '../assets/macLogo.png';

export default function Home() {
  const router = useRouter();

  const handleAttandace = () => {
    router.push({
      pathname: '/attendance',
      query: {
        id: 12345,
        name: 'Joakim Ikot',
      },
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Mac Music School</title>
        <meta name="description" content="Mac Music School Admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <span className={styles.logo}>
          <Image src={Logo} alt="Vercel Logo" width={116} height={63} />
        </span>

        <div className={styles.grid}>
          <a href="register" className={styles.card}>
            <h2>Register</h2>
            <p>Register for the summer school</p>
          </a>

          <a href="dashboard" className={styles.card}>
            <h2>Dashboard</h2>
            <p>Access the Admin Dashboard</p>
          </a>

          {/* <a onClick={handleAttandace} className={styles.card}>
            <h2>Attendance</h2>
            <p>Log time in and out of students</p>
          </a> */}

          <a href="https://macmusicschool.com" className={styles.card}>
            <h2>Website</h2>
            <p>View the website home page</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Mac Music
        </a>
      </footer>
    </div>
  );
}
