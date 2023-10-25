import type { MetaFunction } from "@remix-run/node";
import styles from "./result.module.css";

export const meta: MetaFunction = () => {
  return [{ title: "Search Embed - Search Result" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Search() {
  return (
    <main className={styles.main}>
      <div className={styles.root}>
        <div className={styles.searchbox}>
          <input type="text" className={styles.search} />
          <button className={styles.btnsearch}>Search</button>
        </div>
        <div className={styles.resultbox}>
          <div className={styles.result}>
            <div className={styles.resulttitle}>Title</div>
            <div className={styles.contentresult}>
              <div className={styles.subtitleresult}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
