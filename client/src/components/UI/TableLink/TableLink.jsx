import { useNavigate } from "react-router-dom/dist"
import styles from './TableLink.module.scss'

export const TableLink = (p) => {
  const nav = useNavigate()
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={() => nav(`/workers_table/${p.data.id}`)}>Посмотреть</button>
    </div>
  )
}