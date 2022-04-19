import React, { useState } from "react";
import { Box } from "@material-ui/core";
import ScrollTop from "../../../../UI/ScrollTop";
import ClientPageMenuLeft from "../clientPageMenuLeft/ClientPageMenuLeft";
import User from "../userBlock/User";
import { useClientPageMenu } from "./styles";

const ClientPageMenu = () => {
  const [itemNav, setItemNav] = useState({ i: 1, ttl: "Активные" });

  const classes = useClientPageMenu();

  return (
    <>
      <ClientPageMenuLeft />
      <Box className={classes.clientPage__container}>
        <User itemNav={itemNav} setItemNav={setItemNav} />
      </Box>
      <ScrollTop />
    </>
  );
};

export default React.memo(ClientPageMenu);
