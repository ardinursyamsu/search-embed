import { redirect, type MetaFunction, json } from "@remix-run/node";
import styles from "./post.module.css";
import { Form, useLoaderData } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { frmDataToString } from "~/assets/helper/form-data-converter";
import { createEmbed } from "../assets/helper/sentence-embed";
import { createPost, getPostData } from "~/models/post.server";
import type { Tensor } from "@tensorflow/tfjs";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "Search Embed - Home" }, { name: "description", content: "Welcome to Remix!" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = frmDataToString(formData.get("id"));
  const title = frmDataToString(formData.get("title"));
  const content = frmDataToString(formData.get("content"));

  const embed_vector = (await createEmbed(title)) as unknown;
  const vector_result = embed_vector as Tensor;

  console.log(vector_result.arraySync().toString());

  return redirect("/index");
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = !!params.id ? params.id : "";
  const postData = await getPostData(id);
  return json({ postData });
};

export default function EditPost() {
  const { postData } = useLoaderData<typeof loader>();
  const [content, setContent] = useState(postData.content);
  const [title, setTitle] = useState(postData.title)

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  }

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  }
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
            <input type="text" name="title" className={styles.titleinput} value={postData.title} onChange={handleTitleChange} />
          </div>
        </div>
        <div className={styles.rowcontent}>
          <div className={styles.rowcontentcontainer}>
            <div className={styles.rowcontenttext}>content</div>
          </div>
          <div className={styles.contentinputcontainer}>
            <textarea name="content" className={styles.contentinput} value={postData.content} onChange={handleContentChange}/>
          </div>
        </div>
        <input type="hidden" value={postData.id} />
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
