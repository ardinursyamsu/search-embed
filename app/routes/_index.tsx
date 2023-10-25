import type { MetaFunction } from "@remix-run/node";
import styles from "./_index.module.css"

export const meta: MetaFunction = () => {
  return [
    { title: "Search Embed - Home" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Search() {
  return (
    <main className={styles.main}>
      <div className={styles.root}>
        <div className={styles.logo}>
          <svg width="64px" viewBox="0 0 24 24" fill="aqua" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>{" "}
          <div className={styles.logotext}>EMBED</div>
        </div>
        <form method='post' action='/result'className={styles.searchbox}>
          <input  type="text" name="search" className={styles.search} />
          <button type="submit" className={styles.btnsearch}>
            SEARCH
          </button>
        </form>
      </div>
    </main>
  );
}
