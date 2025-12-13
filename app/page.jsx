/* File: app/page.jsx */
import Link from 'next/link';
import styles from './page.module.css'; // Ensure this CSS file exists

export default function HomePage() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to the Admin Portal</h1>
        <p className={styles.subtitle}>Please select your role to continue.</p>
        <div className={styles.buttonContainer}>
          <Link href="/login" className={styles.buttonPrimary}>
            Login (Admin/Vendor)
          </Link>
          <Link href="/register/admin" className={styles.buttonSecondary}>
            Join as Admin (Vendor)
          </Link>
        </div>
      </div>
    </main>
  );
}