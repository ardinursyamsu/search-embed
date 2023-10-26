import { json } from "@remix-run/node";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import styles from "./result.module.css";
import { Form, useActionData } from "@remix-run/react";
import { frmDataToString } from "~/assets/helper/form-data-converter";
import { createEmbed } from "~/assets/helper/sentence-embed";
import { Tensor } from "@tensorflow/tfjs";
import { searchEntryPostDataUsingEmbed } from "~/models/post.server";
import ResultEntry from "~/assets/component/resultentry";

export const meta: MetaFunction = () => {
  return [{ title: "Search Embed - Search Result" }, { name: "description", content: "Welcome to Remix!" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const searchRequest = formData.get("search");
  if (searchRequest == null || searchRequest == "") {
    return json({ postData: null });
  }
  const search = frmDataToString(searchRequest);

  const embed_vector = (await createEmbed(search)) as unknown;
  const vector_result = embed_vector as Tensor;
  const results = await searchEntryPostDataUsingEmbed(vector_result);

  return json({ postData: results });
};

type post = {
  id: string;
  title: string;
  content: string;
};

export default function Search() {
  const results = useActionData<typeof action>();
  const postData = results?.postData as post[];
  console.log(postData);

  return (
    <main className={styles.main}>
      <div className={styles.root}>
        <Form method="post" className={styles.searchbox}>
          <input name="search" type="text" className={styles.search} />
          <button type="submit" className={styles.btnsearch}>
            Search
          </button>
        </Form>

        <div className={styles.resultbox}>
          {!!postData
            ? postData.map((data: post) => <ResultEntry key={data.id} id={data.id} title={data.title} content={data.content.slice(0, 200) + "..."} />)
            : ""}
        </div>
      </div>
    </main>
  );
}
