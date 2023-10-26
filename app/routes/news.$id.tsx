import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import styles from "./news.module.css";
import { getPostData } from "~/models/post.server";
import { useLoaderData } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Search Embed - News" }, { name: "description", content: "Welcome to Remix!" }];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = !!params.id ? params.id : "";
  const postData = await getPostData(id);
  return json({ postData });
};

export default function News() {
  const { postData } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <main className={styles.main}>
      <div className={styles.root}>
        <div className={styles.spacer}></div>
        <div className={styles.contentnews}>
          <div className={styles.titlecontent}>{postData.title}</div>
          <div className={styles.content}>
            {postData.content.split("\n").map((content) => (
              <p>{content}</p>
            )) }
          </div>
        </div>
      </div>
      <button className={styles.backbutton} onClick={()=>navigate("/result")}>
        <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" enable-background="new 0 0 72 72">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path d="M48.252,69.253c-2.271,0-4.405-0.884-6.011-2.489L17.736,42.258c-1.646-1.645-2.546-3.921-2.479-6.255 c-0.068-2.337,0.833-4.614,2.479-6.261L42.242,5.236c1.605-1.605,3.739-2.489,6.01-2.489c2.271,0,4.405,0.884,6.01,2.489 c3.314,3.314,3.314,8.707,0,12.021L35.519,36l18.743,18.742c3.314,3.314,3.314,8.707,0,12.021 C52.656,68.369,50.522,69.253,48.252,69.253z M48.252,6.747c-1.202,0-2.332,0.468-3.182,1.317L21.038,32.57 c-0.891,0.893-0.833,2.084-0.833,3.355c0,0.051,0,0.101,0,0.151c0,1.271-0.058,2.461,0.833,3.353l24.269,24.506 c0.85,0.85,1.862,1.317,3.063,1.317c1.203,0,2.273-0.468,3.123-1.317c1.755-1.755,1.725-4.61-0.03-6.365L31.292,37.414 c-0.781-0.781-0.788-2.047-0.007-2.828L51.438,14.43c1.754-1.755,1.753-4.61-0.001-6.365C50.587,7.215,49.454,6.747,48.252,6.747z"></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </button>
    </main>
  );
}
