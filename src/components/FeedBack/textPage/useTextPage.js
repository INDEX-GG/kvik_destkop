import { useState, useEffect, useReducer } from "react";
import { useCustomRouter } from "src/hook/globalHooks/useCustomRouter";
import { initialState, linkReducer } from "../reducer";
import TextContext from "../textContext/TextContext";

export const useTextPage = (links) => {
  const [pageData, setPageData] = useState({ links: [], header: "" });
  const [state] = useReducer(linkReducer, initialState);
  const { router } = useCustomRouter();

  const textContents = () => {
    return pageData.links.map((textItem, idx) => {
      const id = Object.values(textItem.link.query)[0];
      return <TextContext key={idx} id={id} textItem={textItem} />;
    });
  };

  //  фильтрую доступные страницы по ключу из  router.query
  useEffect(() => {
    const routerPageId = router.query.id;

    //фильтрация массива по ключу из роутера с элементом из массива для определения активной страницы
    const filtered = links.filter((arr) => {
      const arrPage = arr.idPage;
      if (routerPageId === arrPage) {
        return arr;
      }
    });

    setPageData(filtered[0]);
  }, [router]);

  return {
    pageData,
    state,
    textContents,
  };
};
