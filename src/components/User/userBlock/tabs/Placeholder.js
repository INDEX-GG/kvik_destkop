import React from "react";
import { Box } from "@material-ui/core";

import { usePlayceholderStyle } from "./soldStyle";
const Placeholder = ({ user }) => {
  const classes = usePlayceholderStyle();

  const userBlock = user ? (
    user == 1 ? (
      <Box className="phTitle dark" /* не нашел  phTitle класс */>
        У этого пользователя ещё нет объявлений
      </Box>
    ) : (
      <Box className="phTitle dark" /* не нашел  phTitle класс */>
        У этого пользователя нет завершенных объявлений
      </Box>
    )
  ) : (
    <Box className="phTitle dark" /* не нашел  phTitle класс */>
      У этого пользователя ещё нет объявлений
    </Box>
  );
  return (
    <Box className={classes.clientPage__container_bottom}>
      <Box className={classes.clientPage__container_content}>
        <Box className={classes.phOffers}>
          {userBlock}
          <Box className={classes.phContent}>
            <Box className={classes.phCard}>
              <Box className={classes.phCardPhoto} />
              <Box className={classes.phCardTitle} />
              <Box className={classes.phCardSubtitle} />
            </Box>
            <Box className={classes.phCard}>
              <Box className={classes.phCardPhoto} />
              <Box className={classes.phCardTitle} />
              <Box className={classes.phCardSubtitle} />
            </Box>
            <Box className={classes.phCard}>
              <Box className={classes.phCardPhoto} />
              <Box className={classes.phCardTitle} />
              <Box className={classes.phCardSubtitle} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default React.memo(Placeholder);
