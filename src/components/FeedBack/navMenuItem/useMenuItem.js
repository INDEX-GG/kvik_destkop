import { useEffect, useState, useContext } from "react";
import { ContextApp } from "../reducer";

export const useMenuItem = ({ menuItem, router, param }) => {
  const [open1, setOpen] = useState(false);

  const { state, dispatch } = useContext(ContextApp);
  console.log("paramparamparam", menuItem);
  useEffect(() => {
    console.log("efffffffffffff");
    // const param = Object.keys(menuItem.links[0].link.query)[0];
    console.log(param);
    // if (param === Object.keys(router.query)[0]) {
    //   dispatch({
    //     type: "setTitle",
    //     payload: {
    //       title: menuItem.header,
    //     },
    //   });
    //   setOpen(true);
    // } else {
    //   setOpen(false);
    // }
  });

  return { open1 };
};
