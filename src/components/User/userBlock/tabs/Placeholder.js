import React from "react";
import { Box } from "@material-ui/core";

import { usePlayceholderStyle } from "./soldStyle";
const Placeholder = ({ user }) => {
  const classes = usePlayceholderStyle();
  return (
    <Box
      className="clientPage__container_bottom"
      // className={classes.clientPage__container_bottom}
    >
      <Box
        className="clientPage__container_content"
        // className={classes.clientPage__container_content}
      >
        <Box
          className="phOffers"
          // className={classes.phOffers}
        >
          {user ? (
            user == 1 ? (
              <Box
                className="phTitle dark" //phTitle --> не нашел
                //  className={`${classes.phTitle} ${classes.dark}`}
              >
                У этого пользователя ещё нет объявлений
              </Box>
            ) : (
              <Box
                className="phTitle dark"
                // className={`${classes.phTitle} ${classes.dark}`}
              >
                У этого пользователя нет завершенных объявлений
              </Box>
            )
          ) : (
            <Box
              className="phTitle dark"
              // className={`${classes.phTitle} ${classes.dark}`}
            >
              У этого пользователя ещё нет объявлений
            </Box>
          )}
          <Box
            className="phContent"
            //  className={classes.phContent }
          >
            <Box
              className="phCard"
              // className={classes.phCard }
            >
              <Box
                // className="phCardPhoto"
                className={classes.phCardPhoto}
              />
              <Box
                className="phCardTitle"
                //  className={classes.phCardTitle }
              />
              <Box
                className="phCardSubtitle"
                // className={classes.phCardSubtitle }
              />
            </Box>
            <Box
              className="phCard"
              // className={classes.phCard }
            >
              <Box
                // className="phCardPhoto"
                className={classes.phCardPhoto}
              />
              <Box
                className="phCardTitle"
                //  className={classes.phCardTitle }
              />
              <Box
                className="phCardSubtitle"
                // className={classes.phCardSubtitle }
              />
            </Box>
            <Box
              className="phCard"
              // className={classes.phCard }
            >
              <Box
                // className="phCardPhoto"
                className={classes.phCardPhoto}
              />
              <Box
                className="phCardTitle"
                //  className={classes.phCardTitle }
              />
              <Box
                className="phCardSubtitle"
                // className={classes.phCardSubtitle }
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default React.memo(Placeholder);
