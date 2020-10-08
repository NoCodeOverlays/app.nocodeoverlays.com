import styles from "./Sidebar.module.scss";

const Sidebar = ({ children }) => {
  return <div className={styles.Sidebar}>{children}</div>;
};

export default Sidebar;
