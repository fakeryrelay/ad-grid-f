import { useNavigate } from "react-router-dom";
import styles from "./NavLink.module.scss";

export const NavLink = ({ children, linkTo, icon, handleClick, location }) => {
  const nav = useNavigate();

  const isActive = location?.pathname === linkTo;
  return (
    <li className={isActive ? styles.wrapper__active : styles.wrapper }>
      <button onClick={() => nav(linkTo)}>
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
};
