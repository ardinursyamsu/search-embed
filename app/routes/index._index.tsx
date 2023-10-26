import { json, type MetaFunction } from "@remix-run/node";
import styles from "./index.module.css";
import Entry from "~/assets/component/entry";
import { loadAllPost } from "~/models/post.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Search Embed - News" }, { name: "description", content: "Welcome to Remix!" }];
};

export async function loader() {
  const postData = await loadAllPost();
  
  return json(postData);
}

export default function Index() {
  const postData = useLoaderData<typeof loader>();
  return (
    <main className={styles.main}>
      <div className={styles.empty}></div>
      <div className={styles.body}>
        {postData.map((post) => (
          <Entry key={post.id} id={post.id} title={post.title} subtitle={post.content.substring(0, 200) + "..."} />
        ))}
        
      </div>
    </main>
  );
}
