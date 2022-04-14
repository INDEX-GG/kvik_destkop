import React from "react";
import { Box } from "@material-ui/core";
const Placeholder = ({ user }) => {
  return (
    <Box className="clientPage__container_bottom">
      <Box className="clientPage__container_content">
        <Box className="phOffers">
          {user ? (
            user == 1 ? (
              <Box className="phTitle dark">
                У этого пользователя ещё нет объявлений
              </Box>
            ) : (
              <Box className="phTitle dark">
                У этого пользователя нет завершенных объявлений
              </Box>
            )
          ) : (
            <Box className="phTitle dark">
              У этого пользователя ещё нет объявлений
            </Box>
          )}
          <Box className="phContent">
            <Box className="phCard">
              <Box className="phCardPhoto" />
              <Box className="phCardTitle" />
              <Box className="phCardSubtitle" />
            </Box>
            <Box className="phCard">
              <Box className="phCardPhoto" />
              <Box className="phCardTitle" />
              <Box className="phCardSubtitle" />
            </Box>
            <Box className="phCard">
              <Box className="phCardPhoto" />
              <Box className="phCardTitle" />
              <Box className="phCardSubtitle" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default React.memo(Placeholder);
