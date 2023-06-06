import styles from './Topbar.module.scss'
import { CiSettings, CiLogout } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from 'react-router-dom';

export const Topbar = () => {
  const nav = useNavigate()
  return <div className={styles.wrapper}>
    <div className={styles.title}>
      <h1>Приложение</h1>
    </div>

    <div className={styles.backlink}>
      <button onClick={() => nav(-1)}><IoIosArrowBack /></button>
    </div>

    <div className={styles.navbar}>
      <div className={styles.user}>
        <p>Agafonov N.</p>
        <img src="https://placehold.co/50" alt="User" />
      </div>
      <button><CiSettings /></button>
      <button><CiLogout /></button>
    </div>
  </div>;
};
