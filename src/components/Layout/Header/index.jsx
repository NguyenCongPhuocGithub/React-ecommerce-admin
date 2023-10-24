import styles from "./Header.module.css";
import HeaderLogo from "../../HeaderLogo";
import NavigationBar from "../../NavigationBar";

function Header(){
  return (
    <header className={styles.header}>
      <div className="container mx-auto">
      <div className={styles.header_wrapper}>
          <HeaderLogo />
          <NavigationBar />
        </div>
      </div>

    </header> 
  )
}

export default Header