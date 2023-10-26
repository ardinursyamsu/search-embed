import styles from "./resultentry.module.css";

export default function ResultEntry(props: any) {
  return (
    <div className={styles.result}>
      <a className={styles.resulttitle} href={"/news/" + props.id}>
        {props.title}
      </a>
      <div className={styles.contentresult}>
        <div className={styles.subtitleresult}>{props.content}</div>
      </div>
    </div>
  );
}
