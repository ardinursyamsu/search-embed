import { redirect, type MetaFunction } from "@remix-run/node";
import styles from "./post.module.css";
import { Form } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { frmDataToString } from "~/assets/helper/form-data-converter";
import { createPost, createPostWithEmbed } from "~/models/post.server";
import { createEmbed } from "~/assets/helper/sentence-embed";
import { Tensor } from "@tensorflow/tfjs";

export const meta: MetaFunction = () => {
  return [{ title: "Search Embed - Home" }, { name: "description", content: "Welcome to Remix!" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = frmDataToString(formData.get("title"));
  const content = frmDataToString(formData.get("content"));

  const embed_vector = (await createEmbed(title)) as unknown;
  const vector_result = embed_vector as Tensor;
  const dbResult = await createPostWithEmbed(title, content, vector_result);
  console.log("Number of row(s) affected:", dbResult)
  return redirect("/index");
};

export default function Post() {
  return (
    <main className={styles.main}>
      <div className={styles.navbar}>
        <div className={styles.nav}>
          <a href="/" className={styles.navlink}>
            home
          </a>
        </div>
      </div>
      <Form className={styles.body} method="post" action="">
        <div className={styles.rowtitle}>
          <div className={styles.titlerow}>
            <div className={styles.titletext}>Title</div>
          </div>
          <div className={styles.titleinputcontainer}>
            <input type="text" name="title" className={styles.titleinput} />
          </div>
        </div>
        <div className={styles.rowcontent}>
          <div className={styles.rowcontentcontainer}>
            <div className={styles.rowcontenttext}>content</div>
          </div>
          <div className={styles.contentinputcontainer}>
            <textarea name="content" className={styles.contentinput} />
          </div>
        </div>
        <div className={styles.rowbutton}>
          <button type="submit" className={styles.btnsubmit}>
            Submit
          </button>
          <button type="reset" className={styles.btnreset}>
            Reset
          </button>
        </div>
      </Form>
    </main>
  );
}
