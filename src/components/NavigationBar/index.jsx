import { useEffect, useState } from "react";

import NaviItem from "../NaviItem";
import { naviList } from "../../datas/naviList";
import styles from "./NavigationBar.module.css";

function NavigationBar() {
  const token = window.localStorage.getItem("TOKEN");
  const [filterNaviList, setFilterNaviList] = useState([]);

  useEffect(() => {
    const excludedLabels = ["Login"];
    const addLabels = ["Logout"];
    if (token) {
      const filteredList = naviList.filter((item) => {
        return !excludedLabels.includes(item.label);
      });
      setFilterNaviList(filteredList);
    } else {
      const filteredList = naviList.filter((item) => {
        return !addLabels.includes(item.label);
      });
      setFilterNaviList(filteredList);
    }
  }, [token]);

  return (
    <nav className={styles.main_navigation}>
      <ul>
        {filterNaviList.map((item) => (
          <NaviItem key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}

export default NavigationBar;
