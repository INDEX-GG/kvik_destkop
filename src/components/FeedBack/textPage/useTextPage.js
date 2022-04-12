import { useState, useEffect, useReducer } from "react";
import { useCustomRouter } from "src/hook/globalHooks/useCustomRouter";
import { initialState, linkReducer } from "../reducer";
export const useTextPage = (links, isMobile, myRef) => {
  const [pageData, setPageData] = useState({ links: [], header: "" });
  const [state, dispatch] = useReducer(linkReducer, initialState);
  const { router } = useCustomRouter();

  const scroll = () => {
    let arr = myRef.current.getElementsByTagName("h1");
    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i];
      const { top } = elem.getBoundingClientRect();

      if (top >= 0 && top < 200) {
        let adressId = window.location.search.split("=")[1];
        let adressPage = window.location.search.split("=")[0].slice(1);
        // если не равно значит Новый элемент защел в зону активации активной ссылки
        if (adressId !== elem.id) {
          router.push({ query: { [adressPage]: elem.id } }, undefined, {
            shallow: true,
          });
        }
      }
    }
  };

  const scrollToElem = () => {
    const idElem = Object.values(router.query)[0];
    const elem = document.getElementById(idElem);

    if (elem) {
      if (isMobile) {
        // этот режим работает с модальным окном
        elem.scrollIntoView();
      } else {
        window.scrollTo({ top: elem.offsetTop });
      }
    }
  };

  //  фильтрую доступные страницы по ключу из  router.query
  useEffect(() => {
    const routerPage = Object.keys(router.query)[0];
    //фильтрация массива по ключу из роутера с элементом из массива для определения активной страницы
    const filtered = links.filter((arr) => {
      const arrPage = Object.keys(arr.links[0].link.query)[0];
      if (routerPage === arrPage) {
        return arr;
      }
    });
    setPageData(filtered[0]);
    //скролл при изменении роута до ID значения роута
    scrollToElem();
  }, [router]);
  useEffect(() => {
    window.addEventListener("scroll", scroll);

    setTimeout(() => {
      scrollToElem();
    });
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  useEffect(() => {
    scrollToElem();
  }, [pageData]);
  return {
    pageData,
    state,
  };
};
