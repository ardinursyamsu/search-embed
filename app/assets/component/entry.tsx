import { Link } from "@remix-run/react";
import styles from "./entry.module.css";

export default function Entry(props: any) {
  return (
    <div className={styles.entry}>
      <div className={styles.content}>
        <div className={styles.title}>{!!props.title ? props.title : ""}</div>
        <div className={styles.subtitle}>{!!props.subtitle ? props.subtitle : ""}</div>
      </div>
      <div className={styles.action}>
          <Link to={props.id} className={styles.btnsubmit}>Edit</Link>
        <button className={styles.btndelete}>Delete</button>
      </div>
    </div>
  );
}
