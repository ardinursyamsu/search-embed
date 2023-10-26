import { Link } from "@remix-run/react";
import styles from "./entry.module.css";
import { useNavigate } from "@remix-run/react";

export default function Entry(props: any) {
  const navigate = useNavigate();
  return (
    <div className={styles.entry}>
      <div className={styles.content}>
        <div className={styles.title}>{!!props.title ? props.title : ""}</div>
        <div className={styles.subtitle}>{!!props.subtitle ? props.subtitle : ""}</div>
      </div>
      <div className={styles.action}>
        <button className={styles.btnsubmit} onClick={() => navigate(props.id)}>
          Edit
        </button>
        <button className={styles.btndelete}>Delete</button>
      </div>
    </div>
  );
}
