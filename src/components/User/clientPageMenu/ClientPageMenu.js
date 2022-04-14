import React, { useState } from "react";
import { Box } from "@material-ui/core";

import ScrollTop from "../../../../UI/ScrollTop";

import User from "../../../../components/User/User";

import { useClientPageMenu } from "./styles";
import ClientPageMenuLeft from "../clientPageMenuLeft/ClientPageMenuLeft";

const ClientPageMenu = () => {
  const [itemNav, setItemNav] = useState({ i: 1, ttl: "Активные" });

  const classes = useClientPageMenu();

  return (
    <>
      <ClientPageMenuLeft />

      <Box
        // className="clientPage__container"
        className={classes.clientPage__container} //добавил
      >
        <User itemNav={itemNav} setItemNav={setItemNav} />
      </Box>
      <ScrollTop />
    </>
  );
};

export default ClientPageMenu;
