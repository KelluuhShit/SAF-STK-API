
import styles from "./page.module.css";
import PaymentForm from '../components/PaymentForm';

export default function Home() {
  return (
    <div className={styles.page}>
      Hello From Mpesa Intergration By Kelluuh
      <PaymentForm />
    </div>
  );
}
