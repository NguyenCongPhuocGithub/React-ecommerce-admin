import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NaviItem.module.css";
import {LOCATIONS} from '../../constants'
import { message } from "antd";

function NaviItem({item}){
  const navigate = useNavigate();
  const location = useLocation();
  const has_child = item.childs && item.childs.length > 0 ? "has_child" : "";



  const onLogout= () => {
    navigate(LOCATIONS.LOGIN);
    window.localStorage.removeItem('TOKEN');
    window.localStorage.removeItem('REFRESH_TOKEN');
    message.success('Successful.');
  };

  return (
    <li className={has_child}>
      {item.type && item.type === 'logout' ? <button className = {`${item.type}`}  onClick= {onLogout}>{item.label}</button>
      :<Link
        className={location.pathname === item.path ? styles.current : ""}
        to={item.path}
      >
        {item.label}
      </Link>}
     
      {item.childs && item.childs.length > 0 ? (
        <div className={styles.nav_child}>
          {item.childs.map((child) => {
            return (
              <Link key={`NaviItem_${child.id}`} to={child.path}>
                {child.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </li>
  );
}

export default NaviItem;
