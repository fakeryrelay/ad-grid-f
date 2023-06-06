import { Sidebar } from "./Sidebar/Sidebar";
import { Topbar } from "./Topbar/Topbar";
import styles from "./Layout.module.scss";

export const Layout = ({ children }) => {

  return (
    <div className={styles.wrapper}>
      <Topbar />
      <Sidebar />
      <div className={styles.content}>

        {children}
      </div>
    </div>
  );
};
