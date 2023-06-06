import { ImHome, ImTable, ImNewTab, ImStatsBars, ImTable2 } from "react-icons/im";
import { NavLink } from "../../UI/NavLink/NavLink";
import styles from "./Sidebar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation()

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul>
          <NavLink linkTo={"/"} icon={<ImHome />} location={location}>
            Главная
          </NavLink>
          <li>
            <h3 className={styles.header}>Таблицы</h3>
            <ul>
              <NavLink linkTo={"/shops_table"} icon={<ImTable2 />} location={location}>
                Магазины
              </NavLink>
              <NavLink linkTo={"/workers_table/all"} icon={<ImTable />} location={location}>
                Месячные данные
              </NavLink>
            </ul>
          </li>
          <li>
            <h3 className={styles.header}>Статистика</h3>
            <ul>
              <NavLink linkTo={"/not"} icon={<ImStatsBars />}>
                Продажи Продажи Продажи Продажи Продажи Продажи
              </NavLink>
              <NavLink linkTo={"/not"} icon={<ImStatsBars />}>
                Покупки
              </NavLink>
            </ul>
          </li>
          <li>
            <h3 className={styles.header}>Остальное</h3>
            <ul>
              <NavLink linkTo={"/not"} icon={<ImNewTab />}>
                Новости
              </NavLink>
              <NavLink linkTo={"/not"} icon={<ImNewTab />}>
                Справка
              </NavLink>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};
