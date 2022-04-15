import { useState, useEffect, useReducer } from "react";
import { useCustomRouter } from "src/hook/globalHooks/useCustomRouter";
import { initialState, linkReducer } from "../reducer";
export const useTextPage = (links) => {
  const [pageData, setPageData] = useState({ links: [], header: "" });
  const [state] = useReducer(linkReducer, initialState);
  const { router } = useCustomRouter();

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
  };
};
