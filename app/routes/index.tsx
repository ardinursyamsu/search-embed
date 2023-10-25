import type { MetaFunction } from "@remix-run/node";
import styles from "./index.module.css";

export const meta: MetaFunction = () => {
  return [{ title: "Search Embed - News" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <main className={styles.main}>
      <div className={styles.empty}></div>
      <div className={styles.body}>
        <div className={styles.entry}>
          <div className={styles.content}>
            <div className={styles.title}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
            <div className={styles.subtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip...
            </div>
          </div>
          <div className={styles.action}>
            <button className={styles.btnsubmit}>Edit</button>
            <button className={styles.btndelete}>Delete</button>
          </div>
        </div>
      </div>
    </main>
  );
}
