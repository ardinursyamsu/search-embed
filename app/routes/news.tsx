import type { MetaFunction } from "@remix-run/node";
import styles from "./news.module.css";

export const meta: MetaFunction = () => {
  return [{ title: "Search Embed - News" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function News() {
  return (
    <main className={styles.main}>
      <div className={styles.root}>
        <div className={styles.spacer}></div>
        <div className={styles.contentnews}>
          <div className={styles.titlecontent}>Lorem ipsum dolor sit amet</div>
          <div className={styles.content}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mattis turpis ac enim porttitor molestie. Integer at lacinia elit.
              In quis pulvinar dolor, at semper ex. Nam dignissim, leo non rutrum iaculis, sem odio luctus dolor, non molestie tortor arcu a tortor.
              Etiam dignissim dolor in est rutrum, et venenatis felis vehicula. Nulla efficitur arcu vel suscipit commodo. Donec vulputate vestibulum
              fringilla. Nam pharetra augue et lacus finibus, ut dictum mi venenatis. Aliquam ullamcorper augue nec aliquam tincidunt. Etiam vel
              mollis dui. Nullam convallis, eros eu fringilla pretium, ipsum nunc molestie libero, eu blandit erat nibh in felis. Sed risus massa,
              auctor sed eleifend non, vestibulum sed diam. Praesent dapibus quam fermentum ante convallis rutrum. Integer rhoncus elit sit amet lorem
              ultricies gravida. Donec elementum, ante sit amet lacinia sagittis, nibh turpis ultricies metus, at maximus ligula lacus nec sem. Sed
              vitae eros sapien. Aliquam erat volutpat. Vestibulum eros nulla, varius interdum lacus id, faucibus venenatis neque. Vestibulum ante
              ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla sagittis interdum turpis, et imperdiet tortor vehicula at.
            </p>
            <br />
            <p>
              Quisque id tortor dignissim, suscipit erat sed, gravida purus. Integer faucibus iaculis eros nec dapibus. Cras ac auctor nibh, in
              pulvinar metus. Proin eleifend elementum ante, at consequat ipsum dignissim et. Pellentesque gravida, velit in semper blandit, mauris
              elit malesuada ante, et iaculis justo ex quis nunc. In ac elementum velit, vitae efficitur lectus. Praesent in interdum arcu. Donec
              rutrum neque ex, non fringilla metus tristique sed. Etiam nec urna purus. Etiam est tellus, condimentum non nunc tempus, sagittis
              tristique neque. Sed mattis maximus nunc. Nulla et sapien metus. Nullam odio risus, fringilla pharetra quam non, sodales condimentum ex.
            </p>
            <br />
            <p>
              Cras vitae lacus erat. Mauris at posuere est, sit amet accumsan arcu. Donec elementum, felis eget condimentum iaculis, dui purus
              suscipit mi, non imperdiet eros nisi vitae erat. Quisque sit amet felis est. Curabitur gravida sem vel velit vulputate, tristique
              ultrices magna condimentum. Maecenas est justo, vulputate eu fermentum pharetra, varius consequat est. Nunc vulputate purus eget ornare
              luctus. Vivamus egestas rhoncus vestibulum. Ut vitae mattis velit. Fusce ac metus ut sapien sollicitudin fermentum. Aenean malesuada est
              non leo dictum, lacinia rutrum turpis tempus. Vestibulum vitae vehicula erat, vel placerat velit. Etiam tincidunt non erat nec iaculis.
              Duis gravida magna sed ex aliquam, eget congue massa pretium. Curabitur a libero metus. Nunc pulvinar, justo ut suscipit fermentum, enim
              augue tempor purus, in aliquam nunc purus ultricies magna. Phasellus nec tincidunt arcu. Fusce posuere at justo et lobortis. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum posuere mauris odio, a lacinia nunc pulvinar in.
              Aenean tempor nisl et sodales vulputate. Curabitur sem lectus, blandit pellentesque commodo ac, efficitur tincidunt odio. Suspendisse
              potenti. Morbi interdum efficitur ultricies.
            </p>
          </div>
        </div>
      </div>
      <button className={styles.backbutton}>
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
